import { compile } from 'svelte/compiler';
import * as fs from "fs"

async function ssr(){

  // Your Svelte component code as a string
  const source = `
  <script>
    export let name = 'world';
  </script>

  <h1>Hello {name}!</h1>
  `;

  // Compile the component to JavaScript code
  const { js } = compile(source, {generate: 'ssr'});

  // Write the compiled code to a temporary JS file
  const tmpFile = './tmp-component.js'
  fs.writeFileSync(tmpFile, js.code);

  // Import the temporary JS file as a module
  const { default: Component } = await import('./tmp-component.js');
  const html = Component.render({ name: 'world' });

  console.log(html); 

  // Delete the temporary file
  fs.unlinkSync(tmpFile);
}

ssr();
