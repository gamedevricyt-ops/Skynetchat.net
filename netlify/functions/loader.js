exports.handler = async (event) => {
      const cfg = JSON.parse(Buffer.from(event.headers['x-config'] || '', 'base64').toString() || '{}');

        // Gera código dinâmico conforme checkboxes
          const aim  = cfg.aimEnable  ? `const aimFov=${cfg.aimFov}; const aimSmooth=${cfg.aimSmooth/100};` : '';
            const nr   = cfg.norecoil   ? `Memory.writeByteArray(libg.add(0x123456),new Uint8Array(12).fill(0));` : '';
              const esp  = cfg.esp        ? `enableEsp('${cfg.espColor}');` : '';

                const SOURCE = `
                /* Auto-gerado pelo mod menu */
                ${aim}
                ${nr}
                ${esp}
                setInterval(()=>{
                  if(aimFov){
                      const en=closestEnemy(); if(!en)return;
                          const ang=calcAngle(localPlayer,en); if(ang<aimFov){
                                setViewAngles(ang,aimSmooth);
                                    }
                                      }
                                      },16);
                                        `.trim();

                                          return {
                                              statusCode: 200,
                                                  headers: {'Content-Type': 'text/plain'},
                                                      body: SOURCE
                                                        };
};