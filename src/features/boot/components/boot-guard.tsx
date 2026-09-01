/** Runs before first paint: hides the intro when it should not play at all. */
const GUARD = `(function(){try{
var seen=sessionStorage.getItem('boot')==='1';
var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(seen||still)document.documentElement.classList.add('boot-done');
}catch(e){document.documentElement.classList.add('boot-done')}})()`

/**
 * The intro ships in the server HTML so it covers the page from the very first
 * paint. This decides, before that paint, whether a returning visitor or a
 * reduced-motion visitor should ever see it — no flash in either direction.
 */
export function BootGuard() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GUARD }} />
      <noscript>
        <style>{`[data-boot]{display:none!important}`}</style>
      </noscript>
    </>
  )
}
