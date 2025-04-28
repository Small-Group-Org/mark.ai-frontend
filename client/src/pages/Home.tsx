import React from 'react';

export default function Home() {
  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      backgroundColor: "#0f172a", 
      color: "white",
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar */}
      <header style={{ 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Mark</span>
          <span style={{ color: '#60a5fa', marginLeft: '8px', fontSize: '18px' }}>- Social Growth Expert</span>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Features</a>
          <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>FAQ</a>
          <button style={{ 
            backgroundColor: '#1e293b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '9999px', 
            padding: '8px 20px',
            cursor: 'pointer'
          }}>Sign in</button>
          <button style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '9999px', 
            padding: '8px 20px',
            cursor: 'pointer'
          }}>Sign up</button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ 
          fontSize: '60px', 
          fontWeight: 'bold', 
          color: '#60a5fa',
          textAlign: 'center',
          margin: '0 0 0.5rem 0'
        }}>Interview Mark</h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#93c5fd',
          textAlign: 'center',
          maxWidth: '592px',
          marginBottom: '2rem'
        }}>Your 24/7 Social Media Expert</p>

        {/* Profile Image */}
        <div style={{ 
          width: '120px', 
          height: '150px', 
          background: '#334155', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}></div>
        
        {/* Chat Interface */}
        <div style={{ 
          width: '100%',
          maxWidth: '592px',
          border: '1px solid rgba(51, 65, 85, 0.5)',
          background: 'rgba(30, 41, 59, 0.4)',
          backdropFilter: 'blur(6px)',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{ 
            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
            padding: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66667 1.33337L2 9.33337H8L7.33333 14.6667L14 6.66671L8 6.66671L8.66667 1.33337Z" stroke="#60A5FA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Create engaging content</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.38096 1.33337L2.71429 9.33337H8.71429L8.04763 14.6667L14.7143 6.66671L8.71429 6.66671L9.38096 1.33337Z" stroke="#60A5FA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Schedule posts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.09526 1.33337L2.42859 9.33337H8.42859L7.76192 14.6667L14.4286 6.66671L8.42859 6.66671L9.09526 1.33337Z" stroke="#60A5FA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>24/7 engagement</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.80955 1.33337L2.14288 9.33337H8.14288L7.47622 14.6667L14.1429 6.66671L8.14288 6.66671L8.80955 1.33337Z" stroke="#60A5FA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>Track performance</span>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div style={{ padding: '16px', maxHeight: '250px', overflow: 'auto' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '16px 16px 16px 0',
              padding: '8px 16px',
              display: 'inline-block',
              marginBottom: '10px',
              color: 'white',
              maxWidth: '80%',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)'
            }}>
              👋 Hi! I'm Mark, your potential social media manager.
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '16px 16px 16px 0',
              padding: '8px 16px',
              display: 'inline-block',
              marginBottom: '10px',
              color: 'white',
              maxWidth: '80%',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)'
            }}>
              I'd love to learn about your business and social media goals.
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '16px 16px 16px 0',
              padding: '8px 16px',
              display: 'inline-block',
              marginBottom: '10px',
              color: 'white',
              maxWidth: '80%',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)'
            }}>
              What's your biggest social media challenge right now?
            </div>
            
            <div style={{ 
              background: 'white',
              borderRadius: '16px 16px 0 16px',
              padding: '8px 16px',
              display: 'inline-block',
              marginBottom: '10px',
              color: '#334155',
              maxWidth: '80%',
              alignSelf: 'flex-end',
              marginLeft: 'auto'
            }}>
              I need help in captions
            </div>
          </div>
          
          {/* Chat Input */}
          <div style={{ 
            padding: '13px 16px',
            borderTop: '1px solid rgba(51, 65, 85, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <input 
              type="text"
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: '1px solid rgba(71, 85, 105, 0.5)',
                background: 'rgba(51, 65, 85, 0.5)',
                borderRadius: '9999px',
                padding: '12px 17px',
                color: 'white',
                outline: 'none'
              }}
            />
            <button style={{
              backgroundColor: '#2563eb',
              borderRadius: '9999px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6666 1.33337L9.99998 14.6667L7.33331 8.66671L1.33331 6.00004L14.6666 1.33337Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6666 1.33337L7.33331 8.66671" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '25px 48px 24px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '1280px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#64748b', fontSize: '14px' }}>© 2025 Built by The Honeymooners Club</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
      
      {/* Add stars for the background effect */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 155 + 100}, ${Math.random() * 0.5 + 0.3})`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`
          }} />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
