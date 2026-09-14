<<<<<<< HEAD
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "/"));

const pkgDir = path.dirname(
  require.resolve("@elemental-zcash/zaddr_wasm_parser/package.json"),
);
const src = path.join(pkgDir, "zaddr_wasm_parser_bg.wasm");
const destDir = path.join(process.cwd(), "public", "wasm");
const dest = path.join(destDir, "zaddr_wasm_parser_bg.wasm");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);

console.log(
  `[copy-zaddr-wasm] ${path.relative(process.cwd(), src)} -> public/wasm/zaddr_wasm_parser_bg.wasm`,
);
=======
// Copies the zaddr parser binary into public/ so browser clients can load it
// from a stable same-origin URL. The npm package's generated wrapper uses a
// relative bundler import, which can resolve to a missing asset after deploy.
import { createRequire } from "node:module";
import { copyFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "/"));
const packageDir = path.dirname(
  require.resolve("@elemental-zcash/zaddr_wasm_parser/package.json"),
);
const source = path.join(packageDir, "zaddr_wasm_parser_bg.wasm");
const destination = path.join(
  process.cwd(),
  "public",
  "zaddr_wasm_parser_bg.wasm",
);

copyFileSync(source, destination);
console.log(
  `[copy-zaddr-wasm] ${path.relative(process.cwd(), source)} -> public/zaddr_wasm_parser_bg.wasm`,
);
>>>>>>> a299400675a05cdc1142a55b4b64e52c2b6d947e
