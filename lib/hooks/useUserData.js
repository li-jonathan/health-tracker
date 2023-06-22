import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const doGetUserData = async () => {
      const userData = await getDoc(doc(db, 'users', user.uid));
      if (userData.exists()) {
        setUserData(userData.data());
      }
    };

    if (user) {
      doGetUserData();
    }
  }, [user]);

  return userData;
};
