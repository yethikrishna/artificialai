import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  Drawer,
  Typography,
  List,
  Avatar,
  Badge,
  Tooltip,
  Input,
  Upload,
  Dropdown,
  Card,
  Empty,
  Tag
} from 'antd';
import {
  MenuOutlined,
  PlusOutlined,
  CloudOutlined,
  FileOutlined,
  HistoryOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  FolderOpenOutlined,
  MessageOutlined,
  CloseOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Text } = Typography;
const { Search } = Input;

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
  messageCount: number;
}

interface AIFile {
  id: string;
  name: string;
  type: 'uploaded' | 'ai-generated';
  size: string;
  timestamp: Date;
  preview?: string;
  downloadUrl?: string;
}

interface FloatingSidebarProps {
  onNewConversation: () => void;
  onChatSelect: (chatId: string) => void;
  onFileSelect: (file: AIFile) => void;
}

export default function FloatingSidebar({ 
  onNewConversation, 
  onChatSelect, 
  onFileSelect 
}: FloatingSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'drive' | 'history'>('drive');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real data from Convex
  const [aiFiles, setAiFiles] = useState<AIFile[]>([
    {
      id: '1',
      name: 'AI_Generated_Report.pdf',
      type: 'ai-generated',
      size: '2.4 MB',
      timestamp: new Date('2024-01-15T10:30:00'),
      preview: 'AI-generated analysis report...'
    },
    {
      id: '2',
      name: 'uploaded_document.docx',
      type: 'uploaded',
      size: '1.8 MB',
      timestamp: new Date('2024-01-14T15:45:00'),
      preview: 'User uploaded document...'
    }
  ]);

  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'AI Writing Assistant',
      timestamp: new Date('2024-01-15T14:20:00'),
      preview: 'Help me write a professional email...',
      messageCount: 12
    },
    {
      id: '2',
      title: 'Data Analysis Query',
      timestamp: new Date('2024-01-14T09:15:00'),
      preview: 'Analyze this dataset for trends...',
      messageCount: 8
    }
  ]);

  // Keyboard shortcut for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        onNewConversation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewConversation]);

  const handleFileAction = (action: string, file: AIFile) => {
    switch (action) {
      case 'preview':
        console.log('Preview file:', file);
        break;
      case 'edit':
        console.log('Edit file:', file);
        break;
      case 'download':
        console.log('Download file:', file);
        break;
      case 'delete':
        setAiFiles(prev => prev.filter(f => f.id !== file.id));
        break;
      case 'add-to-chat':
        onFileSelect(file);
        break;
    }
  };

  const getFileActionItems = (file: AIFile): MenuProps['items'] => [
    {
      key: 'preview',
      label: 'Preview',
      icon: <EyeOutlined />,
      onClick: () => handleFileAction('preview', file)
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      onClick: () => handleFileAction('edit', file)
    },
    {
      key: 'download',
      label: 'Download',
      icon: <DownloadOutlined />,
      onClick: () => handleFileAction('download', file)
    },
    {
      key: 'add-to-chat',
      label: 'Add to Chat',
      icon: <MessageOutlined />,
      onClick: () => handleFileAction('add-to-chat', file)
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleFileAction('delete', file)
    }
  ];

  const handleFileUpload = (info: { file: { status: string; name: string; size: number; response?: { url: string } } }) => {
    const { file } = info;
    if (file.status === 'done') {
      const newFile: AIFile = {
        id: Date.now().toString(),
        name: file.name,
        type: 'uploaded',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        timestamp: new Date(),
        downloadUrl: file.response?.url
      };
      setAiFiles(prev => [newFile, ...prev]);
    }
  };

  const filteredFiles = aiFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Tooltip title="Open Sidebar (Ctrl+K for new chat)" placement="right">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<MenuOutlined />}
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300"
            style={{ width: 56, height: 56 }}
          />
        </Tooltip>
      </motion.div>

      {/* Floating Sidebar Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/1000158361.jpg" 
                alt="YETI AI" 
                className="w-8 h-8 rounded-lg object-cover border border-blue-200"
              />
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  YETI AI
                </div>
                <div className="text-xs text-gray-500">AI Assistant</div>
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        }
        placement="left"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={400}
        className="floating-sidebar"
        bodyStyle={{ padding: 0 }}
        headerStyle={{ 
          borderBottom: '1px solid #f0f0f0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
          {/* New Conversation Button */}
          <div className="p-4 border-b border-gray-200">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="primary"
                block
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                  onNewConversation();
                  setIsOpen(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                New Conversation
                <span className="text-xs opacity-80 ml-2">(Ctrl+K)</span>
              </Button>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-white/50">
            <Button
              type={activeTab === 'drive' ? 'primary' : 'text'}
              className={`flex-1 rounded-none border-none ${
                activeTab === 'drive' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              icon={<CloudOutlined />}
              onClick={() => setActiveTab('drive')}
            >
              AI Drive
            </Button>
            <Button
              type={activeTab === 'history' ? 'primary' : 'text'}
              className={`flex-1 rounded-none border-none ${
                activeTab === 'history' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              icon={<HistoryOutlined />}
              onClick={() => setActiveTab('history')}
            >
              Chat History
            </Button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 bg-white/30">
            <Search
              placeholder={`Search ${activeTab === 'drive' ? 'files' : 'chats'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg"
              allowClear
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'drive' ? (
                <motion.div
                  key="drive"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  {/* File Upload */}
                  <div className="mb-4">
                    <Upload
                      multiple
                      showUploadList={false}
                      onChange={handleFileUpload}
                      className="w-full"
                    >
                      <Button
                        block
                        icon={<UploadOutlined />}
                        className="border-dashed border-blue-300 text-blue-600 hover:border-blue-500 hover:text-blue-700"
                      >
                        Upload Files
                      </Button>
                    </Upload>
                  </div>

                  {/* Files List */}
                  {filteredFiles.length > 0 ? (
                    <List
                      dataSource={filteredFiles}
                      renderItem={(file) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <List.Item className="border-none p-0 mb-3">
                            <Card
                              className="w-full bg-white/60 backdrop-blur-sm border-gray-200 hover:bg-white/80 hover:border-blue-300 transition-all duration-200"
                              bodyStyle={{ padding: '12px' }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                  <Avatar
                                    icon={<FileOutlined />}
                                    className={`${
                                      file.type === 'ai-generated' 
                                        ? 'bg-purple-500' 
                                        : 'bg-blue-500'
                                    }`}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <Text className="font-medium text-gray-700 block truncate">
                                      {file.name}
                                    </Text>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Tag
                                        color={file.type === 'ai-generated' ? 'purple' : 'blue'}
                                        className="text-xs"
                                      >
                                        {file.type === 'ai-generated' ? 'AI' : 'Uploaded'}
                                      </Tag>
                                      <Text className="text-xs text-gray-500">
                                        {file.size}
                                      </Text>
                                    </div>
                                    <Text className="text-xs text-gray-400">
                                      {file.timestamp.toLocaleDateString()} {file.timestamp.toLocaleTimeString()}
                                    </Text>
                                  </div>
                                </div>
                                <Dropdown
                                  menu={{ items: getFileActionItems(file) }}
                                  trigger={['click']}
                                  placement="bottomRight"
                                >
                                  <Button
                                    type="text"
                                    icon={<FolderOpenOutlined />}
                                    className="text-gray-400 hover:text-blue-600"
                                  />
                                </Dropdown>
                              </div>
                            </Card>
                          </List.Item>
                        </motion.div>
                      )}
                    />
                  ) : (
                    <Empty
                      description="No files found"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  {filteredChats.length > 0 ? (
                    <List
                      dataSource={filteredChats}
                      renderItem={(chat) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <List.Item className="border-none p-0 mb-3">
                            <Card
                              className="w-full bg-white/60 backdrop-blur-sm border-gray-200 hover:bg-white/80 hover:border-blue-300 cursor-pointer transition-all duration-200"
                              bodyStyle={{ padding: '12px' }}
                              onClick={() => {
                                onChatSelect(chat.id);
                                setIsOpen(false);
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar
                                  icon={<MessageOutlined />}
                                  className="bg-green-500"
                                />
                                <div className="flex-1 min-w-0">
                                  <Text className="font-medium text-gray-700 block truncate">
                                    {chat.title}
                                  </Text>
                                  <Text className="text-sm text-gray-500 block truncate">
                                    {chat.preview}
                                  </Text>
                                  <div className="flex items-center justify-between mt-2">
                                    <Text className="text-xs text-gray-400">
                                      {chat.timestamp.toLocaleDateString()} {chat.timestamp.toLocaleTimeString()}
                                    </Text>
                                    <Badge
                                      count={chat.messageCount}
                                      color="blue"
                                      className="text-xs"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </List.Item>
                        </motion.div>
                      )}
                    />
                  ) : (
                    <Empty
                      description="No chat history found"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Drawer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .floating-sidebar .ant-drawer-body {
            padding: 0;
          }
          .floating-sidebar .ant-drawer-header {
            padding: 16px 20px;
          }
          @media (max-width: 768px) {
            .floating-sidebar .ant-drawer {
              width: 90vw !important;
            }
          }
        `
      }} />
    </>
  );
}