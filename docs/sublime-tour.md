# Sublime interactive guide

The property page loads only the preview until a guest opens the guide. The guide stays isolated in an iframe, preserving the booking page and mobile navigation. A full-screen link provides more space on phones. The layout is illustrative and not to scale.

## Files

- `design/sublime/cabin.blend`: editable model source.
- `public/tours/sublime/cabin.glb`: web export with `floor` and `shell` object metadata.
- `public/tours/sublime/index.html`: viewer, camera presets, exterior fade, tour controls.
- `public/tours/sublime/preview.png`: downstairs cutaway thumbnail.
- `src/components/property/cabin-tour.tsx`: property-page integration.

## Model updates

Edit the tracked Blender source, export all live objects to `cabin.glb` with custom properties enabled, render a downstairs preview to `preview.png`, and save `cabin.blend` in a staging folder. Keep removed objects out of the export. Shell meshes have `shell: true`; room meshes have `floor: downstairs` or `upstairs`.

Run `node scripts/update-sublime-tour.mjs /absolute/path/to/staging` to copy and check assets. Review exterior fade, all room presets, upstairs, and mobile before publishing.

For a reviewed update, start from clean `main` and run the same command with `--publish`. It pulls main without rewriting history, validates the export, runs the checks, commits the assets, and pushes main. The existing Vercel Git integration deploys main. Verify the deployment is Ready and open https://rentwithfrontier.com/sublime and /tours/sublime/index.html before declaring it live. Failed builds stop before pushing. Design changes to the viewer or page component use the normal checked commit/push workflow.

The standalone viewer currently imports Three.js 0.170.0 from jsDelivr. Internet access is required. Update the pinned library deliberately and recheck the tour when changing it.
