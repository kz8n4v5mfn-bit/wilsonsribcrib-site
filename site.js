(function(){
  // mobile nav
  var t=document.querySelector('.menu-toggle'),n=document.getElementById('nav');
  if(t&&n)t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Close menu':'Open menu')});

  // hours + open status in McComb time
  var DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var open=function(d){return d>=2&&d<=6};
  var wd=0,mins=0;
  try{var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var g=function(k){return p.filter(function(x){return x.type===k})[0].value};
    wd=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday'));mins=(+g('hour')%24)*60+(+g('minute'));}catch(e){var d=new Date();wd=d.getDay();mins=d.getHours()*60+d.getMinutes()}
  var isOpen=open(wd)&&mins>=660&&mins<1200;
  var short=isOpen?'Open Now':(open(wd)&&mins<660?'Opens 11 AM':'Closed Now');
  var long=isOpen?'Open now · until 8 PM':(open(wd)&&mins<660?'Opens today at 11 AM':'Closed now · Opens '+(function(){for(var i=1;i<8;i++){var d=(wd+i)%7;if(open(d))return(i===1?'tomorrow':DAYS[d])+' at 11 AM'}})());
  document.querySelectorAll('[data-status]').forEach(function(el){el.textContent=short;if(!isOpen)el.classList.add('closed')});
  document.querySelectorAll('[data-status-long]').forEach(function(el){el.textContent=long});
  document.querySelectorAll('[data-hours]').forEach(function(tb){[2,3,4,5,6,0,1].forEach(function(d){var tr=document.createElement('tr');if(d===wd)tr.className='today';tr.innerHTML='<td>'+DAYS[d]+'</td><td>'+(open(d)?'11 AM – 8 PM':'Closed')+'</td>';tb.appendChild(tr)})});

  // news slider arrows
  var track=document.querySelector('.news-track');
  document.querySelectorAll('[data-slide]').forEach(function(b){b.addEventListener('click',function(){if(!track)return;var c=track.querySelector('.news-card');var w=c?c.getBoundingClientRect().width+20:300;track.scrollBy({left:w*(+b.dataset.slide),behavior:'smooth'})})});

  // forms -> email via FormSubmit, mailto fallback
  var EMAIL='wilsonribcribandexpress@gmail.com';
  document.querySelectorAll('.js-form').forEach(function(f){
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var msg=f.querySelector('.form-msg'),btn=f.querySelector('button[type=submit]');
      var data={};new FormData(f).forEach(function(v,k){if(v)data[k]=v});
      data._subject=(f.dataset.subject||'Website')+' — wilsonsribcrib.com';data._template='table';data._captcha='false';
      btn.disabled=true;msg.className='form-msg';msg.textContent='Sending…';
      fetch('https://formsubmit.co/ajax/'+EMAIL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().then(function(j){if(!r.ok||String(j.success)!=='true')throw new Error(j.message||'fail');})})
      .then(function(){f.reset();msg.className='form-msg ok';msg.textContent="Thank you! We got it and we'll call you soon.";})
      .catch(function(){
        var body=Object.keys(data).filter(function(k){return k[0]!=='_'}).map(function(k){return k.replace(/_/g,' ')+': '+data[k]}).join('\n');
        msg.className='form-msg bad';msg.innerHTML='We couldn’t send that from here. <a href="mailto:'+EMAIL+'?subject='+encodeURIComponent(data._subject)+'&body='+encodeURIComponent(body)+'">Email it to us instead</a> or call (601) 600-2216.';
      })
      .then(function(){btn.disabled=false});
    });
  });
})();
