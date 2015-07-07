
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
