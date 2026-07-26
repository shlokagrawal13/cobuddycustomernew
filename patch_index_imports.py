with open('src/types/navigation/index.ts', 'r', encoding='utf8') as f:
    content = f.read()

imports = [
    "import { AuthStackParamList } from './auth.types';",
    "import { BookingStackParamList } from './booking.types';",
    "import { ChatStackParamList } from './chat.types';",
    "import { HomeStackParamList } from './home.types';",
    "import { ProfileStackParamList } from './profile.types';",
    "import { SafetyStackParamList } from './safety.types';",
    "import { SessionStackParamList } from './session.types';",
    "import { SupportStackParamList } from './support.types';",
    "import { SystemStackParamList } from './system.types';",
    "import { VerifyStackParamList } from './verify.types';",
]

new_imports = '\n'.join(imports) + '\n'

# Put it right after NavigatorScreenParams
content = content.replace("import { NavigatorScreenParams } from '@react-navigation/native';", "import { NavigatorScreenParams } from '@react-navigation/native';\n" + new_imports)

with open('src/types/navigation/index.ts', 'w', encoding='utf8') as f:
    f.write(content)
