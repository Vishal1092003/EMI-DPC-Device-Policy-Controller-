| Old(React Navigation) | New(Expo Router) |
| --------------------------------------- | ----------------------------------------------------- |
| `navigation.navigate("Home")` | `router.push("/src/pages/Home")` |
| Requires prop`navigation` | No prop needed — hook works globally |
| Works only inside`NavigationContainer` | Works automatically with `_layout.tsx` in Expo Router |
