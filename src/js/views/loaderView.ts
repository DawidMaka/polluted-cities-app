export const displayLoader = ( element: HTMLElement ) => {
  const loader = `        
    <div class="loader" aria-busy="true" role="progressbar">
      <span class="sr-only">Loading content...</span>
    </div>
  `;

  element.insertAdjacentHTML( 'beforebegin', loader );
};

export const removeLoader = ( selector: string ) => {
  const loader = document.querySelector( selector )!;
  loader.parentNode!.removeChild( loader );
};
