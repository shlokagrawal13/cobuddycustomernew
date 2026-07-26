"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var project = new ts_morph_1.Project();
project.addSourceFilesAtPaths("src/screens/**/*.tsx");
var sourceFiles = project.getSourceFiles();
var updatedCount = 0;
for (var _i = 0, sourceFiles_1 = sourceFiles; _i < sourceFiles_1.length; _i++) {
    var sourceFile = sourceFiles_1[_i];
    var fileUpdated = false;
    var allElements = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.JsxOpeningElement);
    for (var _d = 0, allElements_1 = allElements; _d < allElements_1.length; _d++) {
        var element = allElements_1[_d];
        var tagName = element.getTagNameNode().getText();
        if (tagName === 'TouchableOpacity' || tagName === 'Pressable') {
            var labelAttr = element.getAttribute('accessibilityLabel');
            if (labelAttr && labelAttr.getKind() === ts_morph_1.SyntaxKind.JsxAttribute) {
                var currentLabel = (_a = labelAttr.getInitializer()) === null || _a === void 0 ? void 0 : _a.getText();
                // BUG 2: Raw JS expressions captured as strings
                // Example: accessibilityLabel="user.email"
                if (currentLabel && currentLabel.startsWith('"') && currentLabel.endsWith('"')) {
                    var val = currentLabel.substring(1, currentLabel.length - 1);
                    if (val === 'button') {
                        // BUG 1: literal "button"
                        var newLabel = 'Action';
                        var parent_1 = element.getParentIfKind(ts_morph_1.SyntaxKind.JsxElement);
                        if (parent_1) {
                            var children = parent_1.getJsxChildren();
                            for (var _e = 0, children_1 = children; _e < children_1.length; _e++) {
                                var child = children_1[_e];
                                if (child.getKind() === ts_morph_1.SyntaxKind.JsxSelfClosingElement) {
                                    var childEl = child.asKind(ts_morph_1.SyntaxKind.JsxSelfClosingElement);
                                    if (childEl && (childEl.getTagNameNode().getText() === 'Icon' || childEl.getTagNameNode().getText() === 'Ionicons')) {
                                        var nameAttr = childEl.getAttribute('name');
                                        if (nameAttr && nameAttr.getKind() === ts_morph_1.SyntaxKind.JsxAttribute) {
                                            var iconName = ((_b = nameAttr.getInitializer()) === null || _b === void 0 ? void 0 : _b.getText().replace(/["']/g, '')) || '';
                                            if (iconName.includes('left') || iconName.includes('back'))
                                                newLabel = 'Go back';
                                            else if (iconName.includes('right') || iconName.includes('next'))
                                                newLabel = 'Next';
                                            else if (iconName.includes('close'))
                                                newLabel = 'Close';
                                            else if (iconName.includes('settings') || iconName.includes('cog'))
                                                newLabel = 'Settings';
                                            else if (iconName.includes('help'))
                                                newLabel = 'Help';
                                            else if (iconName.includes('search') || iconName.includes('magnify'))
                                                newLabel = 'Search';
                                            else if (iconName.includes('bell'))
                                                newLabel = iconName.includes('off') ? 'Mute notifications' : 'Notifications';
                                            else if (iconName.includes('filter') || iconName.includes('tune'))
                                                newLabel = 'Filter';
                                            else if (iconName.includes('edit') || iconName.includes('pencil'))
                                                newLabel = 'Edit';
                                            else if (iconName.includes('plus') || iconName.includes('add'))
                                                newLabel = 'Add';
                                            else if (iconName.includes('camera'))
                                                newLabel = 'Camera';
                                            else if (iconName.includes('mic'))
                                                newLabel = 'Microphone';
                                            else if (iconName.includes('phone') || iconName.includes('call'))
                                                newLabel = 'Call';
                                            else if (iconName.includes('dots') || iconName.includes('more'))
                                                newLabel = 'More options';
                                            else if (iconName.includes('send'))
                                                newLabel = 'Send';
                                            else if (iconName.includes('attach') || iconName.includes('paperclip'))
                                                newLabel = 'Attach file';
                                            else if (iconName.includes('check'))
                                                newLabel = 'Confirm';
                                            else if (iconName.includes('share'))
                                                newLabel = 'Share';
                                            else if (iconName.includes('bookmark') || iconName.includes('save'))
                                                newLabel = 'Save';
                                            else if (iconName.includes('heart'))
                                                newLabel = 'Like';
                                            else if (iconName.includes('alert') || iconName.includes('report'))
                                                newLabel = 'Report Issue';
                                            else if (iconName.includes('delete') || iconName.includes('trash'))
                                                newLabel = 'Delete';
                                            else if (iconName.includes('account') || iconName.includes('profile'))
                                                newLabel = 'Profile';
                                            else if (iconName.includes('star'))
                                                newLabel = 'Review';
                                            else if (iconName.includes('refresh') || iconName.includes('sync'))
                                                newLabel = 'Refresh';
                                            else if (iconName.includes('calendar') || iconName.includes('schedule'))
                                                newLabel = 'Schedule';
                                            else if (iconName.includes('credit-card') || iconName.includes('payment'))
                                                newLabel = 'Payment';
                                            else if (iconName.includes('wallet'))
                                                newLabel = 'Wallet';
                                            else if (iconName.includes('map') || iconName.includes('location'))
                                                newLabel = 'Location';
                                            else if (iconName.includes('compass') || iconName.includes('discover'))
                                                newLabel = 'Discover';
                                            else if (iconName.includes('message') || iconName.includes('chat'))
                                                newLabel = 'Chat';
                                            else
                                                newLabel = iconName.replace(/-/g, ' ');
                                        }
                                    }
                                }
                            }
                            if (newLabel === 'Action') {
                                var onPressAttr = element.getAttribute('onPress');
                                if (onPressAttr && onPressAttr.getKind() === ts_morph_1.SyntaxKind.JsxAttribute) {
                                    var txt = ((_c = onPressAttr.getInitializer()) === null || _c === void 0 ? void 0 : _c.getText()) || '';
                                    if (txt.includes('navigate')) {
                                        var match = txt.match(/navigate\(['"]([^'"]+)['"]/);
                                        if (match)
                                            newLabel = 'Go to ' + match[1].replace('Screen', '');
                                    }
                                }
                            }
                        }
                        labelAttr.setInitializer("\"".concat(newLabel, "\""));
                        fileUpdated = true;
                    }
                    else {
                        // Check for raw expressions
                        if (val.includes('?') && val.includes(':')) {
                            labelAttr.setInitializer("{".concat(val, "}"));
                            fileUpdated = true;
                        }
                        else if (/^[a-zA-Z_]+\.[a-zA-Z_]+$/.test(val)) {
                            if (val === 'cat.title' || val.includes('user.email') || val.includes('activity.price')) {
                                if (val === 'user.email')
                                    labelAttr.setInitializer("{`Email: ${user.email}`}");
                                else if (val === 'activity.price')
                                    labelAttr.setInitializer("{`Price: ${activity.price}`}");
                                else
                                    labelAttr.setInitializer("{".concat(val, "}"));
                                fileUpdated = true;
                            }
                            else {
                                labelAttr.setInitializer("{".concat(val, "}"));
                                fileUpdated = true;
                            }
                        }
                        else if (val.includes('DUMMY_PROFILE.name')) {
                            var replaced = val.replace(/([a-zA-Z_]+\.[a-zA-Z_]+)/g, '$${$1}');
                            labelAttr.setInitializer("{`".concat(replaced, "`}"));
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
        console.log("Updated ".concat(sourceFile.getFilePath()));
    }
}
console.log("Total files updated: ".concat(updatedCount));
