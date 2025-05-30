// Icon mapping for local vs CDN fallback
export const iconConfig = {
  // All local icons from the windows98-icons collection
  local: {
    // Desktop icons
    'directory_closed-4.png': '/icons/win98/windows98-icons/png/directory_closed-4.png',
    'html-0.png': '/icons/win98/windows98-icons/png/html-0.png',
    'internet_connection_wiz-4.png': '/icons/win98/windows98-icons/png/internet_connection_wiz-4.png',
    'media_player-0.png': '/icons/win98/windows98-icons/png/media_player-0.png',
    'notepad-1.png': '/icons/win98/windows98-icons/png/notepad-1.png',
    'outlook_express-4.png': '/icons/win98/windows98-icons/png/outlook_express-4.png',
    'recycle_bin_empty-4.png': '/icons/win98/windows98-icons/png/recycle_bin_empty-4.png',
    'windows-0.png': '/icons/win98/windows98-icons/png/windows-0.png',
    
    // System icons
    'user-0.png': '/icons/win98/windows98-icons/png/users-0.png',
    'user_computer-0.png': '/icons/win98/windows98-icons/png/user_computer-0.png',
    'warning-0.png': '/icons/win98/windows98-icons/png/msg_warning-0.png',
    'messagebox_critical-0.png': '/icons/win98/windows98-icons/png/msg_error-0.png',
    
    // IE and web icons
    'internet_explorer-0.png': '/icons/win98/windows98-icons/png/msie1-0.png',
    'msie1-2.png': '/icons/win98/windows98-icons/png/msie1-2.png',
    'home-0.png': '/icons/win98/windows98-icons/png/homepage-0.png',
    'world-0.png': '/icons/win98/windows98-icons/png/world-0.png',
    
    // Navigation icons (these might not have exact matches, using closest alternatives)
    'back-0.png': '/icons/win98/windows98-icons/png/overlay_shortcut-0.png', // Best alternative available
    'forward-0.png': '/icons/win98/windows98-icons/png/overlay_shortcut-1.png', // Best alternative available  
    'stop-0.png': '/icons/win98/windows98-icons/png/no-0.png',
    'refresh-0.png': '/icons/win98/windows98-icons/png/overlay_refresh-0.png',
    
    // Contact and communication icons
    'mailbox-0.png': '/icons/win98/windows98-icons/png/envelope_closed-0.png',
    'earth-0.png': '/icons/win98/windows98-icons/png/world-0.png',
    'phone-2.png': '/icons/win98/windows98-icons/png/telephony-0.png',
    'msn_messenger-0.png': '/icons/win98/windows98-icons/png/msn.png',
    
    // Project and file icons
    'file_html-0.png': '/icons/win98/windows98-icons/png/html-0.png',
    'shopping-0.png': '/icons/win98/windows98-icons/png/briefcase-0.png', // Using briefcase as shopping alternative
    'cloudy-0.png': '/icons/win98/windows98-icons/png/connected_world-0.png', // Using connected world as cloud alternative
    'application_lightning-0.png': '/icons/win98/windows98-icons/png/application_hourglass-0.png', // Using hourglass as lightning alternative
    
    // Paint icons (from alexgleason.me CDN) - using closest matches
    'paint-0.png': '/icons/win98/windows98-icons/png/paint_file-0.png',
    'paint_brush.png': '/icons/win98/windows98-icons/png/paint_file-1.png',
    'paint_fill.png': '/icons/win98/windows98-icons/png/paint_file-2.png',
    'paint_spray.png': '/icons/win98/windows98-icons/png/paint_file-3.png',
    'paint_line.png': '/icons/win98/windows98-icons/png/paint_file-4.png',
    'paint_rectangle.png': '/icons/win98/windows98-icons/png/paint_file-5.png',
    'paint_circle.png': '/icons/win98/windows98-icons/png/paint_old-0.png',
    'paint_text.png': '/icons/win98/windows98-icons/png/paint_old-1.png',
    'paint_select.png': '/icons/win98/windows98-icons/png/true_type_paint-0.png',
    'paint_eraser.png': '/icons/win98/windows98-icons/png/true_type_paint-1.png',
    'paint_pencil.png': '/icons/win98/windows98-icons/png/notepad-0.png',
    'paint_magnifier.png': '/icons/win98/windows98-icons/png/magnifying_glass-0.png',
    'paint_picker.png': '/icons/win98/windows98-icons/png/magnifying_glass-1.png'
  }
};

// Helper function to get icon source
export const getIconSrc = (iconName) => {
  if (iconConfig.local[iconName]) {
    return iconConfig.local[iconName];
  }
  // Fallback to windows98-icons collection for any unlisted icons
  return `/icons/win98/windows98-icons/png/${iconName}`;
};
