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

  console.log('getUserDetails', getUserDetails);
  let contextData = {
    uid,
    loading,
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
