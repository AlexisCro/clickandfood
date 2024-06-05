import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./app/(tabs)/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import styles from "./assets/stylesheet/style";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <View style={styles.container}>{session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}</View>;
}
