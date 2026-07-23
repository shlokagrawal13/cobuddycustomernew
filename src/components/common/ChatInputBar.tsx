import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  TextInput, Modal, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';

interface ChatInputBarProps {
  onSend: (text: string) => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  const [isAttachmentMenuVisible, setAttachmentMenuVisible] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    onSend(text);
    setInputText('');
  };

  const handleAttachment = (type: string) => {
    setAttachmentMenuVisible(false);
    onSend(type);
  };

  return (
    <>
      <SafeAreaView edges={['bottom']} style={styles.inputSafeArea}>
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachBtn}
            onPress={() => setAttachmentMenuVisible(true)}
          >
            <Icon name="plus" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TextInput 
            style={styles.textInput}
            placeholder="Message..."
            placeholderTextColor={theme.colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={() => handleSend(inputText)}
          />
          {inputText.trim().length > 0 ? (
            <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend(inputText)}>
              <Icon name="send" size={20} color={theme.colors.background} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.attachBtn}
              onPress={() => handleAttachment('📸 Sent a photo')}
            >
              <Icon name="camera-outline" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      {/* ── Polished Attachment Menu (Bottom Sheet) ── */}
      <Modal
        visible={isAttachmentMenuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAttachmentMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setAttachmentMenuVisible(false)}
        >
          <View style={styles.attachmentSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Share Content</Text>
            
            <View style={styles.attachmentGrid}>
              
              <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('📸 Sent a photo')}>
                <View style={[styles.attachIconWrap, { backgroundColor: 'rgba(212,175,55,0.1)' }]}>
                  <Icon name="camera" size={28} color={theme.colors.primary} />
                </View>
                <Text style={styles.attachLabel}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('🖼️ Sent an image')}>
                <View style={[styles.attachIconWrap, { backgroundColor: 'rgba(212,175,55,0.1)' }]}>
                  <Icon name="image" size={28} color={theme.colors.primary} />
                </View>
                <Text style={styles.attachLabel}>Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('📄 Sent a document')}>
                <View style={[styles.attachIconWrap, { backgroundColor: 'rgba(212,175,55,0.1)' }]}>
                  <Icon name="file-document" size={28} color={theme.colors.primary} />
                </View>
                <Text style={styles.attachLabel}>Document</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.attachItem} onPress={() => handleAttachment('📍 Shared a location')}>
                <View style={[styles.attachIconWrap, { backgroundColor: 'rgba(212,175,55,0.1)' }]}>
                  <Icon name="map-marker" size={28} color={theme.colors.primary} />
                </View>
                <Text style={styles.attachLabel}>Location</Text>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputSafeArea: { backgroundColor: theme.colors.surface },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', 
    paddingHorizontal: 8, paddingVertical: 10, 
    backgroundColor: theme.colors.surface,
  },
  attachBtn: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  textInput: { 
    flex: 1, minHeight: 40, maxHeight: 100, 
    backgroundColor: theme.colors.background, 
    borderRadius: 20, 
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, 
    color: theme.colors.textPrimary, fontSize: 15, 
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  sendBtn: { 
    width: 40, height: 40, borderRadius: 20, 
    backgroundColor: theme.colors.primary, 
    justifyContent: 'center', alignItems: 'center',
    marginRight: 4
  },

  // Attachment Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  attachmentSheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2, 
    backgroundColor: theme.colors.border, 
    alignSelf: 'center', marginBottom: 16
  },
  sheetTitle: {
    fontSize: 16, fontWeight: 'bold', 
    color: theme.colors.textPrimary, 
    marginBottom: 24, textAlign: 'center'
  },
  attachmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  attachItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 8,
  },
  attachIconWrap: {
    width: 60, height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8
  },
  attachLabel: {
    fontSize: 12, 
    color: theme.colors.textPrimary, 
    textAlign: 'center',
    fontWeight: '500'
  },
});
