# Effect previews

Generated from Damson's native Metal renderer, using the opt-in export in
`Tests/DamsonTerminalTests/ScreenEffectPreviewTests.swift` in hulryung/damson.
No CSS filters or simulated effects are applied to these assets.

Render on a Mac with Metal available:

```sh
mkdir -p /tmp/damson-effects
DAMSON_EXPORT_EFFECTS=1 DAMSON_SHOT_DIR=/tmp/damson-effects swift test --filter ScreenEffectPreviewTests/testExportShowcase
```

Convert named PNG stills to lossless WebP. For rainGlass, snowfall and underwater,
encode the numbered PNG sequences at 15 fps using H.264, yuv420p, CRF 20 and
faststart. Each sequence has 72 frames (4.8 seconds), sampled at real time from
shader time 17 seconds. The loop restarts; it is not a seamless animation.

All examples use the same English sample terminal grid, Menlo 13, 2x scale and
100% effect intensity. This is generated sample content, not a user's session.
