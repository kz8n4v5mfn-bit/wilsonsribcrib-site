/* Thanksgiving theme: banner, turkey, harvest row, falling leaves. Order link points at the holiday menu until the order page is live. */
(function(){
  var ORDER_HREF="holiday-order.html";
  var TURKEY='<svg viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
   '<g transform="translate(100 118)">'+
   [[-72,"#8c2e0f"],[-48,"#b5421a"],[-24,"#d9731c"],[0,"#e0a21f"],[24,"#d9731c"],[48,"#b5421a"],[72,"#8c2e0f"]].map(function(f){
     return '<g transform="rotate('+f[0]+')"><ellipse cx="0" cy="-62" rx="16" ry="58" fill="'+f[1]+'"/><ellipse cx="0" cy="-70" rx="8" ry="40" fill="#f6c453" opacity=".55"/></g>';}).join("")+
   '</g><ellipse cx="100" cy="132" rx="44" ry="40" fill="#7a4a26"/><ellipse cx="100" cy="140" rx="29" ry="28" fill="#a8703f"/>'+
   '<circle cx="100" cy="94" r="18" fill="#7a4a26"/>'+
   '<path d="M84 80h32l-4-26H88z" fill="#1d1410"/><rect x="80" y="78" width="40" height="7" rx="2" fill="#1d1410"/><rect x="94" y="75" width="12" height="12" fill="#e0a21f"/><rect x="97" y="78" width="6" height="6" fill="#1d1410"/>'+
   '<circle cx="92" cy="94" r="4.5" fill="#fff"/><circle cx="108" cy="94" r="4.5" fill="#fff"/><circle cx="93" cy="95" r="2.2" fill="#111"/><circle cx="107" cy="95" r="2.2" fill="#111"/>'+
   '<polygon points="94,100 106,100 100,113" fill="#f0a91a"/><ellipse cx="100" cy="116" rx="4" ry="7" fill="#c2231b"/>'+
   '<path d="M88 168v14M112 168v14M80 183h16M104 183h16" stroke="#e0a21f" stroke-width="4" stroke-linecap="round" fill="none"/></svg>';
  var PUMPKIN='<svg class="pk" viewBox="0 0 100 90" aria-hidden="true"><ellipse cx="30" cy="52" rx="24" ry="32" fill="#c9591a"/><ellipse cx="70" cy="52" rx="24" ry="32" fill="#c9591a"/><ellipse cx="50" cy="52" rx="24" ry="34" fill="#e0782a"/><path d="M50 20v64M36 26c-8 14-8 38 0 54M64 26c8 14 8 38 0 54" stroke="#a3430e" stroke-width="2" fill="none"/><path d="M50 20c0-8 2-12 8-14" stroke="#5a7a2a" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M58 10c8-4 14 0 14 6-8 2-14 0-14-6z" fill="#7a9a3a"/></svg>';
  var CORN='<svg class="corn" viewBox="0 0 50 110" aria-hidden="true"><ellipse cx="25" cy="48" rx="15" ry="42" fill="#f0c23a"/><g fill="#d9a21d"><circle cx="19" cy="22" r="3"/><circle cx="31" cy="22" r="3"/><circle cx="19" cy="36" r="3"/><circle cx="31" cy="36" r="3"/><circle cx="19" cy="50" r="3"/><circle cx="31" cy="50" r="3"/><circle cx="19" cy="64" r="3"/><circle cx="31" cy="64" r="3"/><circle cx="25" cy="29" r="3"/><circle cx="25" cy="43" r="3"/><circle cx="25" cy="57" r="3"/></g><path d="M25 106C6 96 4 60 10 44c6 20 12 34 15 62zM25 106c19-10 21-46 15-62-6 20-12 34-15 62z" fill="#7a9a3a"/></svg>';
  var WHEAT='<svg class="wh" viewBox="0 0 50 110" aria-hidden="true"><path d="M25 108V30" stroke="#8a6a2a" stroke-width="3"/><g fill="#e0a21f"><ellipse cx="25" cy="14" rx="5" ry="11"/><ellipse cx="14" cy="30" rx="5" ry="11" transform="rotate(-30 14 30)"/><ellipse cx="36" cy="30" rx="5" ry="11" transform="rotate(30 36 30)"/><ellipse cx="13" cy="50" rx="5" ry="11" transform="rotate(-30 13 50)"/><ellipse cx="37" cy="50" rx="5" ry="11" transform="rotate(30 37 50)"/><ellipse cx="14" cy="70" rx="5" ry="11" transform="rotate(-30 14 70)"/><ellipse cx="36" cy="70" rx="5" ry="11" transform="rotate(30 36 70)"/></g></svg>';
  var COLORS=["#b5421a","#d9731c","#e0a21f","#7a4a26","#8a9a3b","#c9591a"];
  function leafSvg(c){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1c5 3 8 8 6 13l3 1-4 2c-1 3-3 4-5 6-2-2-4-3-5-6l-4-2 3-1C4 9 7 4 12 1z" fill="'+c+'"/><path d="M12 6v17" stroke="rgba(0,0,0,.28)" stroke-width="1.3"/></svg>'}
  function ready(fn){if(document.readyState!=="loading")fn();else document.addEventListener("DOMContentLoaded",fn)}
  ready(function(){
    var b=document.body;
    // banner
    var ban=document.createElement("div");ban.className="hol-banner";
    ban.innerHTML=TURKEY.replace('viewBox','width="22" height="22" viewBox')+'Happy Thanksgiving from Wilsons Rib Crib. Order your holiday feast by Sat, Nov 21.<a href="'+ORDER_HREF+'">Holiday menu &rarr;</a>';
    b.insertBefore(ban,b.firstChild);
    // hero turkey
    var hero=document.querySelector(".hero-frame");
    if(hero){var t=document.createElement("div");t.className="hol-turkey";t.innerHTML=TURKEY;hero.appendChild(t)}
    // harvest row before footer
    var foot=document.querySelector(".site-foot");
    if(foot){
      var h=document.createElement("section");h.className="hol-harvest";
      h.innerHTML='<h2>Gather round for Thanksgiving</h2><p>Whole smoked turkey, seafood stuffed dressing, NOLA sweet potato pie and more. Order ahead and pick up Nov 24 or 25. We are closed Thanksgiving Day.</p><a class="btn red" href="'+ORDER_HREF+'">See the holiday menu</a><div class="hol-row">'+WHEAT+PUMPKIN+CORN+TURKEY.replace('<svg ','<svg class="tk" ')+CORN+PUMPKIN+WHEAT+'</div>';
      foot.parentNode.insertBefore(h,foot);
    }
    // falling leaves
    if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    var box=document.createElement("div");box.className="hol-leaves";box.setAttribute("aria-hidden","true");
    var n=window.innerWidth<700?9:16;
    for(var i=0;i<n;i++){
      var l=document.createElement("div");l.className="hol-leaf";
      var s=18+Math.random()*16;
      l.style.cssText="left:"+(Math.random()*100)+"%;width:"+s+"px;height:"+s+"px;animation-duration:"+(11+Math.random()*12)+"s;animation-delay:-"+(Math.random()*20)+"s;--dx:"+(Math.random()*160-60)+"px";
      l.innerHTML=leafSvg(COLORS[i%COLORS.length]);
      l.firstChild.style.animationDuration=(2+Math.random()*3)+"s";
      box.appendChild(l);
    }
    b.appendChild(box);
  });
})();
