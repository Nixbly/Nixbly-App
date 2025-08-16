# 1) Ensure no lingering Metro/Expo ports (macOS)
for p in 8081 19000 19001; do
  PID=$(lsof -ti tcp:$p) && kill -9 $PID || true
done

# 2) Clean any accidental global node_modules and env var
rm -rf ~/node_modules
unset NODE_PATH

# 3) Nuke caches and reinstall
watchman watch-del-all || true
rm -rf node_modules pnpm-lock.yaml
rm -rf $TMPDIR/metro-* $TMPDIR/haste-map-* ~/.cache/expo
pnpm store prune
pnpm install

# 4) Start fresh
npx expo start -c
