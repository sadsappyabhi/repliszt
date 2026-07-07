import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [claims, setClaims] = useState(null);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    // Check if we have token_hash in URL (magic link callback)
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      supabase.auth
        .verifyOtp({
          token_hash,
          type: type || "email",
        })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            // Clear URL params
            window.history.replaceState({}, document.title, "/");
          }
          setVerifying(false);
        });
    }

    // Check for existing session using getClaims
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!error && session) {
        setClaims(session.user || null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setClaims(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClaims(null);
  };

  // Show verification state
  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Authentication</h1>
        <span className="loading loading-spinner loading-xl"></span>
        <p className="text-xl">Confirming your magic link...</p>
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
  // Show auth error
  if (authError) {
    return (
      <div className="flex flex-\ol items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Authentication</h1>
        <p className="text-xl">✗ Authentication failed</p>
        <p className="text-xl">{authError}</p>
        <button
          className="btn btn-error m-10"
          onClick={() => {
            setAuthError("");
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }
  // Show auth success (briefly before claims load)
  if (authSuccess && !claims) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Authentication</h1>
        <p className="text-xl">✓ Authentication successful!</p>
        <span className="loading loading-spinner loading-xl"></span>
        <p className="text-xl">Loading your account...</p>
      </div>
    );
  }

  // If user is logged in, show welcome screen
  if (claims) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="text-xl">You are logged in as: {claims.email}</p>
        <div className="flex">
          <Link to="/lists">
            <button className="btn btn-primary my-5 mx-2">View Lists</button>
          </Link>
          <button className="btn btn-warning my-5 mx-2" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }
  // Show login form
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to RepLiszt!</h1>
            <p className="py-6">
              Keep your repertoire organized with relevant information such as
              composer, year published, date last practiced, and more!
            </p>
            <Link to="/about">
              <button className="btn btn-primary m-2">Learn More</button>
            </Link>
            <div className="divider"></div>
            <div className="flex flex-col items-center justify-center">
              <p className="mx-auto mt-5 my-2 text-xl font-bold">
                Sign in with a magic link
              </p>
              <form
                className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                onSubmit={handleLogin}
              >
                <input
                  type="email"
                  placeholder="your@email.tld"
                  className="input validator text-center"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  disabled={loading}
                  className="btn btn-neutral mt-4"
                  type="submit"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md">
                      Loading
                    </span>
                  ) : (
                    <span>Send magic link</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
