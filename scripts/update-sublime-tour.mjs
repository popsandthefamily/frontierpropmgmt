import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/update-sublime-tour.mjs <folder containing cabin.glb, preview.png, cabin.blend> [--publish]');
const run = (...args) => execFileSync(args[0], args.slice(1), { stdio: 'inherit' });
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const publish = process.argv.includes('--publish');
if (publish && (git('branch','--show-current') !== 'main' || git('status','--porcelain'))) throw new Error('Publishing requires a clean main checkout.');
if (publish) run('git','pull','--ff-only','origin','main');
for (const name of ['cabin.glb','preview.png','cabin.blend']) if (!existsSync(resolve(source,name))) throw new Error(`Missing ${name}`);
const glb=readFileSync(resolve(source,'cabin.glb'));
if (glb.toString('ascii',0,4)!=='glTF' || glb.readUInt32LE(4)!==2 || glb.readUInt32LE(8)!==glb.length) throw new Error('Invalid GLB export');
copyFileSync(resolve(source,'cabin.glb'),'public/tours/sublime/cabin.glb');
copyFileSync(resolve(source,'preview.png'),'public/tours/sublime/preview.png');
copyFileSync(resolve(source,'cabin.blend'),'design/sublime/cabin.blend');
run('npm','run','lint','--','src/components/property/cabin-tour.tsx');
run('npm','run','build');
if(publish && git('status','--porcelain')) {
 run('git','add','public/tours/sublime','design/sublime');
 run('git','commit','-m','Update Sublime interactive cabin layout');
 run('git','push','origin','main');
}
console.log(publish ? 'Updated main. Verify the connected production deployment before calling this live.' : 'Updated tour assets. Review locally before publishing.');
