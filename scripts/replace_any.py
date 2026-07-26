import os
import re

src_dir = 'src/screens'
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            screen_name = file.replace('.tsx', '')
            original_content = content
            
            # Remove the previously added NavigationProp if it exists
            content = content.replace(', NavigationProp', '')
            content = content.replace('useNavigation<NavigationProp<RootStackParamList>>()', 'useNavigation<any>()')
            
            if 'useNavigation<any>()' in content or 'useRoute<any>()' in content or 'useNavigation<NativeStackNavigationProp' in content:
                
                # Ensure NativeStackNavigationProp is imported
                if 'useNavigation' in content and 'NativeStackNavigationProp' not in content:
                    import_statement = "import { NativeStackNavigationProp } from '@react-navigation/native-stack';\n"
                    # insert after last import
                    last_import_idx = content.rfind('import ')
                    if last_import_idx != -1:
                        end_of_line = content.find('\n', last_import_idx)
                        content = content[:end_of_line+1] + import_statement + content[end_of_line+1:]
                    else:
                        content = import_statement + content

                if 'useRoute<any>()' in content and 'RouteProp' not in content:
                    content = re.sub(r'(import\s+\{[^}]*)(useRoute)([^}]*\}\s+from\s+[\'\"].*?@react-navigation/native[\'\"])', r'\1\2, RouteProp\3', content)

                if 'RootStackParamList' not in content:
                    import_statement = "import { RootStackParamList } from '../../types/navigation';\n"
                    last_import_idx = content.rfind('import ')
                    if last_import_idx != -1:
                        end_of_line = content.find('\n', last_import_idx)
                        content = content[:end_of_line+1] + import_statement + content[end_of_line+1:]
                    else:
                        content = import_statement + content

                content = content.replace('useNavigation<any>()', 'useNavigation<NativeStackNavigationProp<RootStackParamList>>()')
                content = content.replace('useNavigation<NavigationProp<RootStackParamList>>()', 'useNavigation<NativeStackNavigationProp<RootStackParamList>>()')
                content = content.replace('useRoute<any>()', f"useRoute<RouteProp<RootStackParamList, '{screen_name}'>>()")
                
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'Updated {path}')
