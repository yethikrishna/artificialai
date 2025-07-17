# YETI AI Custom Rive Animations

This directory contains custom Rive animation files (.riv) for the YETI AI platform.

## Required Animation Files

### 1. yeti-logo.riv
**Purpose:** Main YETI logo animation with mountain theme
**States:** idle, hover, pulse
**Features:**
- Mountain silhouette with snow caps
- YETI text integration
- Subtle breathing/pulsing animation
- Hover effects with glow

### 2. yeti-loading.riv
**Purpose:** Loading indicator with mountain theme
**States:** spinning, pulsing, breathing
**Features:**
- Three mountain peaks that light up in sequence
- Snow particle effects
- Rotating mountain range
- Smooth transitions

### 3. yeti-thinking.riv
**Purpose:** AI thinking indicator
**States:** idle, processing, complete
**Features:**
- Brain/thought bubble with mountain backdrop
- Pulsing neural network effect
- Snow falling animation
- Processing indicators

### 4. yeti-success.riv
**Purpose:** Success/completion animation
**States:** idle, celebrate, complete
**Features:**
- Mountain with flag on peak
- Celebration particles
- Victory animation
- Confetti/snow burst

### 5. yeti-error.riv
**Purpose:** Error/warning animation
**States:** idle, shake, warning
**Features:**
- Avalanche/warning theme
- Shaking mountain
- Red warning indicators
- Error recovery animation

### 6. yeti-skills.riv
**Purpose:** Skill-specific animations
**States:** writing, coding, image, translate, research, music
**Features:**
- Different mountain scenes for each skill
- Skill-specific icons integrated with mountains
- Smooth state transitions
- Interactive hover effects

## Design Guidelines

### Color Palette
- Primary: #3B82F6 (Blue)
- Secondary: #8B5CF6 (Purple)
- Accent: #1E40AF (Dark Blue)
- Snow: #FFFFFF
- Mountain: #4A5568 to #2D3748 (Gradient)

### Animation Principles
- Smooth, natural movements
- 60fps performance
- Lightweight file sizes (<50KB each)
- Consistent timing (2-3 second loops)
- Subtle, professional animations

### Mountain Theme Elements
- Snow-capped peaks
- Layered mountain ranges
- Falling snow particles
- Aurora/sky effects
- Minimalist, clean design

## Creating Custom Animations

### Tools Needed
1. [Rive Editor](https://rive.app/downloads) (Free)
2. Vector graphics software (optional)
3. Reference images of mountains/snow

### Steps
1. **Design Phase:**
   - Sketch mountain silhouettes
   - Plan animation states
   - Create vector assets

2. **Animation Phase:**
   - Import/create vectors in Rive
   - Set up bones and constraints
   - Create smooth transitions
   - Add particle effects

3. **State Machine:**
   - Define input triggers
   - Set up state transitions
   - Add interactive elements
   - Test all states

4. **Optimization:**
   - Minimize file size
   - Optimize for web performance
   - Test on different devices
   - Ensure smooth playback

### File Naming Convention
- Use kebab-case: `yeti-logo.riv`
- Include version numbers: `yeti-logo-v2.riv`
- Backup originals: `yeti-logo-source.riv`

## Integration

The animations are automatically loaded by the `YetiAnimation` component:

