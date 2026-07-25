const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('navigation.goBack()')) return;

  console.log(`Processing: ${filePath}`);

  // 1. Add import if missing
  if (!content.includes('useSmartNavigation')) {
    // Find last import
    const importRegex = /import .* from .*\n/g;
    let lastImportIndex = 0;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportIndex = match.index + match[0].length;
    }
    
    const importStatement = `import { useSmartNavigation } from '../../hooks/useSmartNavigation';\n`;
    if (lastImportIndex > 0) {
      content = content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
    } else {
      content = importStatement + content;
    }
  }

  // 2. Add hook call if missing
  if (!content.includes('const { smartGoBack } = useSmartNavigation();')) {
    // Look for const navigation = useNavigation...
    const navRegex = /const navigation = useNavigation.*?;/g;
    const match = navRegex.exec(content);
    
    if (match) {
      const insertIndex = match.index + match[0].length;
      content = content.slice(0, insertIndex) + '\n  const { smartGoBack } = useSmartNavigation();' + content.slice(insertIndex);
    } else {
      // Fallback: look for export const ComponentName = () => {
      const compRegex = /export const .*? = .*? => {/g;
      const compMatch = compRegex.exec(content);
      if (compMatch) {
        const insertIndex = compMatch.index + compMatch[0].length;
        content = content.slice(0, insertIndex) + '\n  const { smartGoBack } = useSmartNavigation();' + content.slice(insertIndex);
      }
    }
  }

  // 3. Replace navigation.goBack() with smartGoBack()
  content = content.replace(/navigation\.goBack\(\)/g, 'smartGoBack()');

  fs.writeFileSync(filePath, content, 'utf8');
}

walkDir('./src/screens', processFile);
console.log('Done refactoring!');
