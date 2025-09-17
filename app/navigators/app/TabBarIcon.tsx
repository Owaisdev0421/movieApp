import React from "react";

export const TabBarIcon = ({ focused, activeIcon, inactiveIcon }) => {
  const IconComponent = focused ? activeIcon : inactiveIcon;

  return <IconComponent />;
};
