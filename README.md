
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
  [en, pl] = rawRow.split(' - ')
  outputData.push({en, pl})

console.log(JSON.stringify(outputData))
```
