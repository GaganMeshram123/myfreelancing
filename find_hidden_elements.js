import http from 'http';

async function main() {
  let listData = "";
  try {
    listData = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/list', (res) => {
        let body = "";
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });
  } catch (err) {
    console.error("Failed to connect:", err.message);
    process.exit(1);
  }

  const targets = JSON.parse(listData);
  const target = targets.find((t) => t.type === 'page');

  if (!target) {
    console.error("No target found!");
    process.exit(1);
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
    ws.send(JSON.stringify({
      id: 2,
      method: "Runtime.evaluate",
      params: {
        expression: `(() => {
          const els = [];
          
          // Helper to get element details
          function getDetails(el) {
            const style = window.getComputedStyle(el);
            return {
              tag: el.tagName,
              id: el.id,
              classes: el.className,
              w: el.offsetWidth,
              h: el.offsetHeight,
              top: el.offsetTop,
              left: el.offsetLeft,
              opacity: style.opacity,
              visibility: style.visibility,
              display: style.display,
              zIndex: style.zIndex,
              position: style.position
            };
          }

          // Traverse root child elements
          const root = document.getElementById('root');
          if (!root) return "No root element found";
          
          els.push({ role: "root", ...getDetails(root) });
          
          // Traverse children of root
          for (let i = 0; i < root.children.length; i++) {
            const child = root.children[i];
            els.push({ role: "root-child-" + i, ...getDetails(child) });
            
            // If it's the home wrapper
            if (child.className.includes('bg-background') || child.className.includes('min-h-screen')) {
              for (let j = 0; j < child.children.length; j++) {
                const subChild = child.children[j];
                els.push({ role: "home-child-" + j, ...getDetails(subChild) });
                
                // If it's main
                if (subChild.tagName === 'MAIN') {
                  for (let k = 0; k < subChild.children.length; k++) {
                    const section = subChild.children[k];
                    els.push({ role: "section-" + k + "-" + section.id, ...getDetails(section) });
                    
                    // If it's hero
                    if (section.id === 'home') {
                      // Get all headings and text blocks inside hero
                      const headings = section.querySelectorAll('h1, p, button, canvas');
                      headings.forEach((h, idx) => {
                        els.push({ role: "hero-el-" + idx, ...getDetails(h) });
                      });
                    }
                  }
                }
              }
            }
          }
          
          return JSON.stringify(els, null, 2);
        })()`
      }
    }));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id === 2) {
      console.log(msg.result.result.value);
      ws.close();
    }
  };
}

main().catch(err => console.error(err));
