import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths("src/screens/**/*.tsx");

const sourceFiles = project.getSourceFiles();
let updatedCount = 0;

for (const sourceFile of sourceFiles) {
  let fileUpdated = false;

  const allElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);

  for (const element of allElements) {
    const tagName = element.getTagNameNode().getText();
    if (tagName === 'TouchableOpacity' || tagName === 'Pressable') {
      
      const labelAttr = element.getAttribute('accessibilityLabel') as any;
      
      if (labelAttr && labelAttr.getKind() === SyntaxKind.JsxAttribute) {
        let currentLabel = labelAttr.getInitializer()?.getText();
        
        // BUG 2: Raw JS expressions captured as strings
        // Example: accessibilityLabel="user.email"
        if (currentLabel && currentLabel.startsWith('"') && currentLabel.endsWith('"')) {
          const val = currentLabel.substring(1, currentLabel.length - 1);
          
          if (val === 'button') {
            // BUG 1: literal "button"
            let newLabel = 'Action';
            
            const parent = element.getParentIfKind(SyntaxKind.JsxElement);
            if (parent) {
              const children = parent.getJsxChildren();
              
              for (const child of children) {
                if (child.getKind() === SyntaxKind.JsxSelfClosingElement) {
                  const childEl = child.asKind(SyntaxKind.JsxSelfClosingElement);
                  if (childEl && (childEl.getTagNameNode().getText() === 'Icon' || childEl.getTagNameNode().getText() === 'Ionicons')) {
                    const nameAttr = childEl.getAttribute('name') as any;
                    if (nameAttr && nameAttr.getKind() === SyntaxKind.JsxAttribute) {
                      const iconName = nameAttr.getInitializer()?.getText().replace(/["']/g, '') || '';
                      
                      if (iconName.includes('left') || iconName.includes('back')) newLabel = 'Go back';
                      else if (iconName.includes('right') || iconName.includes('next')) newLabel = 'Next';
                      else if (iconName.includes('close')) newLabel = 'Close';
                      else if (iconName.includes('settings') || iconName.includes('cog')) newLabel = 'Settings';
                      else if (iconName.includes('help')) newLabel = 'Help';
                      else if (iconName.includes('search') || iconName.includes('magnify')) newLabel = 'Search';
                      else if (iconName.includes('bell')) newLabel = iconName.includes('off') ? 'Mute notifications' : 'Notifications';
                      else if (iconName.includes('filter') || iconName.includes('tune')) newLabel = 'Filter';
                      else if (iconName.includes('edit') || iconName.includes('pencil')) newLabel = 'Edit';
                      else if (iconName.includes('plus') || iconName.includes('add')) newLabel = 'Add';
                      else if (iconName.includes('camera')) newLabel = 'Camera';
                      else if (iconName.includes('mic')) newLabel = 'Microphone';
                      else if (iconName.includes('phone') || iconName.includes('call')) newLabel = 'Call';
                      else if (iconName.includes('dots') || iconName.includes('more')) newLabel = 'More options';
                      else if (iconName.includes('send')) newLabel = 'Send';
                      else if (iconName.includes('attach') || iconName.includes('paperclip')) newLabel = 'Attach file';
                      else if (iconName.includes('check')) newLabel = 'Confirm';
                      else if (iconName.includes('share')) newLabel = 'Share';
                      else if (iconName.includes('bookmark') || iconName.includes('save')) newLabel = 'Save';
                      else if (iconName.includes('heart')) newLabel = 'Like';
                      else if (iconName.includes('alert') || iconName.includes('report')) newLabel = 'Report Issue';
                      else if (iconName.includes('delete') || iconName.includes('trash')) newLabel = 'Delete';
                      else if (iconName.includes('account') || iconName.includes('profile')) newLabel = 'Profile';
                      else if (iconName.includes('star')) newLabel = 'Review';
                      else if (iconName.includes('refresh') || iconName.includes('sync')) newLabel = 'Refresh';
                      else if (iconName.includes('calendar') || iconName.includes('schedule')) newLabel = 'Schedule';
                      else if (iconName.includes('credit-card') || iconName.includes('payment')) newLabel = 'Payment';
                      else if (iconName.includes('wallet')) newLabel = 'Wallet';
                      else if (iconName.includes('map') || iconName.includes('location')) newLabel = 'Location';
                      else if (iconName.includes('compass') || iconName.includes('discover')) newLabel = 'Discover';
                      else if (iconName.includes('message') || iconName.includes('chat')) newLabel = 'Chat';
                      else newLabel = iconName.replace(/-/g, ' ');
                    }
                  }
                }
              }
              
              if (newLabel === 'Action') {
                 const onPressAttr = element.getAttribute('onPress') as any;
                 if (onPressAttr && onPressAttr.getKind() === SyntaxKind.JsxAttribute) {
                    const txt = onPressAttr.getInitializer()?.getText() || '';
                    if (txt.includes('navigate')) {
                       const match = txt.match(/navigate\(['"]([^'"]+)['"]/);
                       if (match) newLabel = 'Go to ' + match[1].replace('Screen', '');
                    }
                 }
              }
            }
            
            labelAttr.setInitializer(`"${newLabel}"`);
            fileUpdated = true;
          } else {
            // Check for raw expressions
            if (val.includes('?') && val.includes(':')) {
              labelAttr.setInitializer(`{${val}}`);
              fileUpdated = true;
            } else if (/^[a-zA-Z_]+\.[a-zA-Z_]+$/.test(val)) {
              if (val === 'cat.title' || val.includes('user.email') || val.includes('activity.price')) {
                 if (val === 'user.email') labelAttr.setInitializer(`{\`Email: \${user.email}\`}`);
                 else if (val === 'activity.price') labelAttr.setInitializer(`{\`Price: \${activity.price}\`}`);
                 else labelAttr.setInitializer(`{${val}}`);
                 fileUpdated = true;
              } else {
                 labelAttr.setInitializer(`{${val}}`);
                 fileUpdated = true;
              }
            } else if (val.includes('DUMMY_PROFILE.name')) {
              const replaced = val.replace(/([a-zA-Z_]+\.[a-zA-Z_]+)/g, '$${$1}');
              labelAttr.setInitializer(`{\`${replaced}\`}`);
              fileUpdated = true;
            }
          }
        }
      }
    }
  }

  if (fileUpdated) {
    sourceFile.saveSync();
    updatedCount++;
    console.log(`Updated ${sourceFile.getFilePath()}`);
  }
}

console.log(`Total files updated: ${updatedCount}`);
