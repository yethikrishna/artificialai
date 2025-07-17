# YETI AI Custom Rive Animation Creation Guide

## 🎯 Overview
This guide provides step-by-step instructions for creating professional, branded `.riv` files for YETI AI using the Rive Editor.

## 📋 Required Files to Create

### Core Animations
1. **yeti-logo.riv** - Main YETI logo with mountain theme
2. **mountain-loading.riv** - Loading animation with snow/mountain elements
3. **skill-animations.riv** - 16 skill-specific animations

### Design Requirements

#### YETI Logo Animation (yeti-logo.riv)
- **Theme**: Mountain/snow with YETI branding
- **States**: idle, hover, active, thinking
- **Elements**:
  - YETI text with mountain silhouette
  - Subtle snow particles
  - Breathing/pulsing effect
  - Hover glow effect
- **Size**: 80x80px (scalable)
- **Duration**: 2-3 seconds loop

#### Mountain Loading Animation (mountain-loading.riv)
- **Theme**: Snow-capped mountain peaks
- **Elements**:
  - Mountain silhouettes
  - Falling snow particles
  - Aurora/sky gradient background
  - Progress indicator (0-100%)
- **States**: loading, complete, error
- **Size**: 200x100px (scalable)
- **Duration**: Continuous loop

#### Skill Animations (skill-animations.riv)
Create 16 unique animations for each skill:

**Creative Skills**:
1. **Writing** - Pen/pencil with flowing text
2. **Image** - Camera with flash effect
3. **Music** - Musical notes floating
4. **Design** - Brush with color splash

**Research Skills**:
5. **Search** - Magnifying glass with data points
6. **Research** - Books with knowledge particles
7. **Data** - Charts with animated bars
8. **Summary** - Document with highlight effect

**Communication Skills**:
9. **Translate** - Globe with language symbols
10. **Voice** - Sound waves animation
11. **Meeting** - Video call interface
12. **Email** - Envelope with send effect

**Technical Skills**:
13. **Code** - Terminal with typing effect
14. **Debug** - Bug with fix animation
15. **AI** - Brain with neural network
16. **Optimize** - Gear with speed lines

## 🛠️ Rive Editor Setup

### Step 1: Download Rive Editor
1. Visit [rive.app](https://rive.app)
2. Create free account
3. Download Rive Editor for your OS

### Step 2: Create New Project
1. Open Rive Editor
2. Create new file
3. Set artboard size (recommended: 200x200px)
4. Make background transparent

### Step 3: Import Assets
1. Import SVG logos/icons
2. Import any raster images (PNG/JPG)
3. Organize in assets panel

## 🎨 Animation Creation Process

### For YETI Logo:

#### Design Phase:
1. **Create Mountain Silhouette**:
   - Use pen tool to draw mountain peaks
   - Apply gradient (dark blue to white)
   - Add snow caps with white shapes

2. **Add YETI Text**:
   - Import YETI logo or create text
   - Position above mountains
   - Apply gradient text effect

3. **Snow Particles**:
   - Create small white circles
   - Duplicate and scatter
   - Vary sizes (2-8px)

#### Animation Phase:
1. **Switch to Animate Mode** (Tab key)
2. **Create Timeline** (2-3 seconds)
3. **Animate Elements**:
   - Mountains: Subtle sway (±2px)
   - Snow: Falling motion (Y-axis)
   - Logo: Gentle pulse (scale 1.0 to 1.05)
   - Glow: Opacity fade in/out

4. **Set Keyframes**:
   - Frame 0: Initial state
   - Frame 30: Mid animation
   - Frame 60: Return to initial (loop)

#### State Machine:
1. **Create States**:
   - Idle (default loop)
   - Hover (faster pulse + glow)
   - Active (scale up + bright glow)
   - Thinking (rotating particles)

2. **Add Triggers**:
   - onHover → Hover state
   - onLeave → Idle state
   - onClick → Active state
   - onThinking → Thinking state

### For Skill Animations:

#### Each skill needs:
1. **Icon Design** (vector-based)
2. **Hover Effect** (scale + glow)
3. **Active State** (bounce + color change)
4. **Idle Loop** (subtle movement)

#### Example - Writing Skill:
1. **Icon**: Pen/pencil
2. **Animation**: 
   - Pen tip glows
   - Text appears as if being written
   - Paper has subtle texture
3. **States**: idle, hover, active
4. **Duration**: 1.5 seconds

## 📱 Mobile Optimization

### Responsive Design:
- Use Rive's Layout features
- Set min/max sizes
- Test on different screen sizes
- Ensure touch targets are 44px+

### Performance:
- Keep file sizes under 50KB each
- Optimize vector paths
- Limit particle count on mobile
- Use efficient easing curves

## 🔧 Technical Specifications

### File Settings:
- **Format**: .riv
- **Artboard**: Transparent background
- **Frame Rate**: 60fps
- **Compression**: Enabled
- **Runtime**: Web (JavaScript)

### State Machine Inputs:
