// Portada: bloquea tarjetas futuras, muestra el candado y anima las recien desbloqueadas.
(async function(){
  var CANDADO='<svg class="candado" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" role="img" aria-label="Aun no disponible"><rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  var hoy=await Tiempo.hoy(),vistas=[],aviso=document.createElement('div'),tm;
  aviso.className='aviso-flotante';aviso.setAttribute('role','status');document.body.appendChild(aviso);
  try{vistas=JSON.parse(localStorage.getItem('vistas')||'[]')}catch(e){}
  document.querySelectorAll('.card').forEach(function(c){
    var n=+c.dataset.n;
    if(Tiempo.abierto(n,hoy)){
      if(Tiempo.fecha(n)===hoy)c.classList.add('hoy');
      if(vistas.indexOf(n)<0){c.classList.add('nueva');vistas.push(n)}
    }else{
      c.classList.add('bloqueada');c.setAttribute('aria-disabled','true');c.insertAdjacentHTML('beforeend',CANDADO);
      c.addEventListener('click',function(e){e.preventDefault();
        aviso.textContent='Todavia no es momento. Esta sorpresa se abre el '+Tiempo.bonita(n)+'.';
        aviso.classList.add('ver');clearTimeout(tm);tm=setTimeout(function(){aviso.classList.remove('ver')},3500)});
    }
  });
  try{localStorage.setItem('vistas',JSON.stringify(vistas))}catch(e){}
  document.querySelector('.rejilla').classList.add('lista');
})();
