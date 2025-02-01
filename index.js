import{a as q,S,i as u}from"./assets/vendor-B6jJ9_I0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const h=t=>`
    <li class="gallery-card">
    <a href="${t.largeImageURL}">
    <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}"  />
    </a>
    <div class="gallery-container">
    <ul class="gallery-list">
    <li class="gallery-item">
    <p class="gallery-text">Likes</p>
    <p class="gallery-quantity">${t.likes}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Views</p>
    <p class="gallery-quantity">${t.views}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Comments</p>
    <p class="gallery-quantity">${t.comments}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Downloads</p>
    <p class="gallery-quantity">${t.downloads}</p>
    </li>
    </ul>
    </div>
    </li>
  `,f=(t,s)=>{const l={params:{key:"48304744-eb473523a8629254a32e0d9a6",q:t,page:s,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}};return q.get("https://pixabay.com/api/",l)},L=document.querySelector(".js-search-form"),y=document.querySelector(".js-gallery"),m=document.querySelector(".js-loader"),i=document.querySelector(".js-load-more-btn");let n=1,d="",g=0;const v=new S(".gallery a",{captionsData:"alt",captionDelay:250}),a=t=>{t?m.classList.remove("visually-hidden"):m.classList.add("visually-hidden")},E=async t=>{try{if(t.preventDefault(),d=t.currentTarget.user_query.value.trim(),a(!0),d===""){u.error({position:"topRight",message:"Sorry, field must be filled in!"}),a(!1);return}n=1;const{data:s}=await f(d,n);if(s.total===0){u.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),y.innerHTML="",a(!1),i.classList.add("visually-hidden"),L.reset();return}g=Math.ceil(s.totalHits/15),g>1&&(i.classList.remove("visually-hidden"),a(!1),i.addEventListener("click",b));const l=s.hits.map(o=>h(o)).join("");a(!1),y.innerHTML=l,v.refresh()}catch(s){console.log(s),a(!1)}},c=document.querySelector(".js-search-input");c.addEventListener("input",()=>{c.value!==""?c.classList.add("input-typing"):c.classList.remove("input-typing")});L.addEventListener("submit",E);const b=async t=>{try{n++,a(!0);const{data:s}=await f(d,n),l=s.hits.map(e=>h(e)).join("");y.insertAdjacentHTML("beforeend",l);const o=y.querySelector(".gallery-card:last-child");if(o){const r=o.getBoundingClientRect().height*2;scrollBy({top:r,left:0,behavior:"smooth"})}n===g&&(i.classList.add("visually-hidden"),u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.removeEventListener("click",b)),a(!1),v.refresh()}catch{u.error({position:"topRight",message:"Sorry, data processing error. Please try again!"}),a(!1)}};
//# sourceMappingURL=index.js.map
