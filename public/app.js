            document.getElementById('launchBtn').onclick = async ()=>{
              const status = document.getElementById('status');
                status.textContent='Baixando script...';

                  // Pega as configs que o menu mostra
                    const cfg={
                        aimEnable: document.getElementById('aimEnable').checked,
                            aimFov: parseInt(document.getElementById('aimFov').value),
                                aimSmooth: parseInt(document.getElementById('aimSmooth').value),
                                    norecoil: document.getElementById('norecoil').checked,
                                        fullLock: document.getElementById('fullLock').checked,
                                            esp: document.getElementById('esp').checked,
                                                espLine: document.getElementById('espLine').checked,
                                                    espColor: document.getElementById('espColor').value
                                                      };

                                                        // Faz fetch no loader passando as configs via header simples
                                                          const r = await fetch('/.netlify/functions/loader',{
                                                              headers:{'x-config': btoa(JSON.stringify(cfg))}
                                                                });
                                                                  const code = await r.text();

                                                                    status.textContent='Salvando assist...';
                                                                      // Cria dll/so fake só pra ter arquivo
                                                                        const blob = new Blob([code],{type:'application/octet-stream'});
                                                                          const url = URL.createObjectURL(blob);
                                                                            const a=document.createElement('a');
                                                                              a.href=url; a.download='ffassist.dll'; a.style.display='none';
                                                                                document.body.appendChild(a); a.click(); a.remove();

                                                                                  status.textContent='Abrindo Free Fire...';
                                                                                    // Abre o jogo
                                                                                      if(/Android/i.test(navigator.userAgent)){
                                                                                          window.location='intent:#Intent;launchFlags=0x10000000;component=com.dts.freefireth/com.dts.freefireth.FFMainActivity;end';
                                                                                            }else{
                                                                                                alert('DLL salvo. Abra o FF e injete manual via injetor.');
                                                                                                  }
                                                                                                    status.textContent='Pronto!';
                                                                                                    };
                                                                                                    

                                                                                                