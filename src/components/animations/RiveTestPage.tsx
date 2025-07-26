import { useState } from 'react';
import { RiveScrollController } from './RiveScrollController';
import { Card, Space, Typography, Row, Col, Switch } from 'antd';

const { Title, Text } = Typography;

export function RiveTestPage() {
  const [showFallbacks, setShowFallbacks] = useState(false);
  
  const testAnimations = [
    {
      name: 'YETI Logo',
      src: showFallbacks ? '/animations/missing-yeti-logo.riv' : '/animations/yeti-logo.riv',
      stateMachine: 'Logo State Machine',
      artboard: 'Logo',
      width: 80,
      height: 80
    },
    {
      name: 'Mountain Loading',
      src: showFallbacks ? '/animations/missing-mountain-loading.riv' : '/animations/mountain-loading.riv',
      stateMachine: 'Loading State Machine',
      artboard: 'Loading',
      width: 200,
      height: 100
    },
    {
      name: 'Skill Animation',
      src: showFallbacks ? '/animations/missing-skill-animations.riv' : '/animations/skill-animations.riv',
      stateMachine: 'Skill State Machine',
      artboard: 'Writing',
      width: 60,
      height: 60
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <Title level={2}>YETI AI Rive Animation Test Page</Title>
        <Text className="text-gray-600">
          Test your custom .riv files and fallback animations
        </Text>
        
        <div className="mt-4">
          <Space>
            <Text>Show Fallbacks:</Text>
            <Switch 
              checked={showFallbacks} 
              onChange={setShowFallbacks}
              checkedChildren="Fallback"
              unCheckedChildren="Rive"
            />
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {testAnimations.map((animation, index) => (
          <Col xs={24} md={8} key={index}>
            <Card 
              title={animation.name}
              className="text-center h-full"
            >
              <div className="mb-4 flex justify-center">
                <RiveScrollController
                  src={animation.src}
                  stateMachine={animation.stateMachine}
                  artboard={animation.artboard}
                  width={animation.width}
                  height={animation.height}
                  scrollBound={false}
                  className="border border-gray-200 rounded"
                  onLoad={() => console.log(`${animation.name} loaded`)}
                  onLoadError={(error: string) => console.log(`${animation.name} error:`, error)}
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <div>Size: {animation.width}x{animation.height}px</div>
                <div>State Machine: {animation.stateMachine}</div>
                <div>Artboard: {animation.artboard}</div>
                <div className={showFallbacks ? 'text-orange-600' : 'text-green-600'}>
                  Mode: {showFallbacks ? 'Fallback CSS' : 'Rive File'}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-8">
        <Card title="Animation States Test">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['idle', 'hover', 'active', 'thinking'].map((state) => (
              <div key={state} className="text-center">
                <div className="mb-2">
                  <RiveScrollController
                    src={showFallbacks ? '/animations/missing-yeti-logo.riv' : '/animations/yeti-logo.riv'}
                    stateMachine="Logo State Machine"
                    artboard="Logo"
                    width={60}
                    height={60}
                    className="border border-gray-200 rounded mx-auto"
                  />
                </div>
                <Text className="text-sm capitalize">{state}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Card title="Development Instructions">
          <div className="space-y-4">
            <div>
              <Title level={4}>📁 File Structure</Title>
              <pre className="bg-gray-100 p-4 rounded text-sm">
{`public/animations/
├── yeti-logo.riv          (Main YETI logo)
├── mountain-loading.riv   (Loading animation)
├── skill-animations.riv   (16 skill animations)
└── RIVE_CREATION_GUIDE.md (Creation guide)`}
              </pre>
            </div>
            
            <div>
              <Title level={4}>🎯 Next Steps</Title>
              <ol className="list-decimal list-inside space-y-2">
                <li>Download Rive Editor from <a href="https://rive.app" target="_blank" rel="noopener noreferrer" className="text-blue-600">rive.app</a></li>
                <li>Follow the RIVE_CREATION_GUIDE.md instructions</li>
                <li>Create yeti-logo.riv first (simplest)</li>
                <li>Test with this page by toggling the switch above</li>
                <li>Create remaining animations</li>
                <li>Deploy to production</li>
              </ol>
            </div>
            
            <div>
              <Title level={4}>✅ Current Status</Title>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-green-600">✅ React integration ready</li>
                <li className="text-green-600">✅ Fallback animations working</li>
                <li className="text-green-600">✅ Mobile responsive</li>
                <li className="text-green-600">✅ Error handling implemented</li>
                <li className="text-orange-600">⏳ Custom .riv files needed</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}