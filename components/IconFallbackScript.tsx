const TIMEOUT_MS = 10000;

const script = `(function(){
var seen=new WeakMap();
function swap(img){var f=img.getAttribute("data-fallback");if(f&&img.getAttribute("src")!==f)img.src=f;}
document.addEventListener("error",function(e){if(e.target instanceof HTMLImageElement)swap(e.target);},true);
setInterval(function(){
var now=Date.now(),h=window.innerHeight;
document.querySelectorAll("img[data-fallback]").forEach(function(img){
if(img.complete)return;
var r=img.getBoundingClientRect();
if(!r.width||r.bottom<0||r.top>h)return;
var start=seen.get(img);
if(start===undefined)seen.set(img,now);else if(now-start>=${TIMEOUT_MS})swap(img);
});
},1000);
})();`;

export default function IconFallbackScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
