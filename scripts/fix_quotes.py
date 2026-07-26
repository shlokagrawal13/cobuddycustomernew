content = open('src/types/navigation/index.ts').read()
content = content.replace("\\'", "'")
open('src/types/navigation/index.ts', 'w').write(content)

content = open('src/types/navigation/wallet.types.ts').read()
content = content.replace("\\'", "'")
open('src/types/navigation/wallet.types.ts', 'w').write(content)
