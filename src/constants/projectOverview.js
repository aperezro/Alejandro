// Homepage summaries stay separate from the full project descriptions and stories.
export const PROJECT_SUMMARIES = {
  'project-reignition': 'Ported a Godot .NET/C# game to iPhone and iPad with multitouch controls and mobile layouts. Debugged rendering, mission loading, and post-level menus, then tested the fixes on real Apple devices.',
  'unleashed-recompiled': 'Brought Unleashed Recompiled to iOS as a native ARM64 app with a Metal renderer and SPIR-V shader translation. Added touch controls and resolved installer, rendering, and background-resume issues on real hardware.',
  dusklight: 'Built GameCube-style multitouch controls for Dusklight’s existing iOS build. Integrated controller selection, stick sensitivity, and gyro aiming, then adapted the input system into a shared module through maintainer review.',
  cycourse: 'Built an Android scheduling and campus app in a team of four. Implemented Java/XML interfaces, Spring Boot APIs, and WebSocket communication for student scheduling and social features.',
  'lift-mate': 'Implemented Firebase sign-in and workout logging, personal records, and progress views. Designed the screens in Figma after five user interviews and developed the app in a small team.',
  'autonomous-roomba': 'Programmed motors and sensors in C for autonomous scanning, mapping, and obstacle avoidance. Built a Python GUI for manual control and live mapping, then demonstrated navigation to a target.',
  'ps4-accessibility': 'Translated DUALSHOCK 4 motion, stick, and button inputs into computer controls using C. Built a controller-driven maze and sentence-entry interface that can feed text-to-speech for accessible interaction.',
  'mannys-quest': 'Taught myself Python and built a Pygame platformer with animated sprites, levels, enemy AI, and a GUI. Published gameplay that classmates used for speedruns and feedback.',
};

export const ENGINEERING_HIGHLIGHTS = {
  'unleashed-recompiled': [
    ['Native iOS integration', 'Adapted the ARM64 application, game-data installer, memory mapping, and UIKit/SDL lifecycle.'],
    ['Metal rendering', 'Adapted native rendering and presentation paths, translating existing SPIR-V shaders with SPIRV-Cross.'],
    ['Multitouch controls', 'Implemented independently tracked sticks, triggers, and buttons for iPhone and iPad.'],
    ['Device debugging', 'Investigated black screens, orientation errors, and background GPU submissions on real hardware.'],
  ],
  'project-reignition': [
    ['Godot / .NET deployment', 'Prepared the native iOS export and ahead-of-time C# build, signing, and game-video pipeline.'],
    ['Persistent multitouch', 'Connected movement, camera, gameplay, and menu controls to the existing input actions.'],
    ['Phone and tablet layouts', 'Adapted safe areas, display coverage, camera framing, and post-level interfaces.'],
    ['Platform debugging', 'Investigated shader export, jump effects, and native scene-loading lifetimes with device checks.'],
  ],
  dusklight: [
    ['Touch input integration', 'Added GameCube-style multitouch controls to the project’s existing native iOS build.'],
    ['Shared input module', 'Moved the implementation into common platform paths following maintainer feedback.'],
    ['Controller and gyro support', 'Integrated device selection, persisted sensitivity, PAD conversion, and iOS gyro aiming.'],
    ['Testing and investigation', 'Documented device tests, texture experiments, startup issues, and unresolved validation limits.'],
  ],
};
