import React, { useState } from 'react';

export const UserContext = React.createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [allDepartment, setAllDepartment] = useState<any>([]);
  const [getDepartments, setGetDepartments] = useState<any>([]);
  const [getUserDetails, setGetUserDetails] = useState<any>();
  const [allActivity, settAllActivity] = useState<any>([]);
  const [uid, setUid] = useState(null);
  const [viewDetails, setViewDetails] = useState<any>({});

  let contextData = {
    uid,
    loading,
    viewDetails,
    setViewDetails,
    setLoading,
    setUid,
    allUsers,
    setAllUsers,
    allDepartment,
    setAllDepartment,
    getDepartments,
    setGetDepartments,
    getUserDetails,
    setGetUserDetails,
    allActivity,
    settAllActivity,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
