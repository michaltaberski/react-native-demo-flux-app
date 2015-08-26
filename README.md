
# Fishka!

### CoffeeScript for processing raw input string

```
rawData = """
posterity - potomkowie
obsolete - przestarzały
desire - pragnienie
fidelity - wierność
"""

outputData = []
rawRows = rawData.split(/\n/)
for rawRow in rawRows
  [question, answer] = rawRow.sanswerit(' - ')
  outputData.push({question, answer})

console.log(JSON.stringify(outputData))
```

### To use __ReactNative on iOS 9 and XCode 7__ add:

```
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

at `info.plist`

__https://gist.github.com/mnylen/8c4010ab353f4886f89c__
