import { Link } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import homeImage from "../assets/images/home.png";

export default function AdminLayout({ 
  title, 
  subtitle, 
  icon, 
  children, 
  showBackButton = true,
  showAdminPanelButton = true,
  extraNavButtons = []
}) {
  const currentUser = getUserFromToken();

  return (
    <>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        filter: "brightness(0.7)"
      }} />
      
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          width: "100%",
          margin: "0 20px",
          padding: "40px", 
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            {icon && (
              <div style={{
                width: "80px",
                height: "80px",
                backgroundColor: "rgba(255, 215, 0, 0.8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "32px"
              }}>
                {icon}
              </div>
            )}
            <h1 style={{ 
              margin: "0 0 15px 0", 
              color: "#FFD700", 
              textShadow: "3px 3px 8px rgba(0,0,0,0.9)",
              fontSize: "32px",
              fontWeight: "bold"
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ 
                margin: "0", 
                color: "#F0E68C", 
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                fontSize: "16px"
              }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Main Content */}
          {children}

          {/* Navigation */}
          <div style={{ 
            display: "flex", 
            gap: "15px", 
            justifyContent: "center", 
            marginTop: "25px", 
            flexWrap: "wrap" 
          }}>
            {showBackButton && (
              <Link to="/home" style={{ 
                padding: "12px 24px", 
                backgroundColor: "rgba(0, 123, 255, 0.8)", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "25px",
                backdropFilter: "blur(5px)"
              }}>
                🏠 Início
              </Link>
            )}
            
            {extraNavButtons.map((button, index) => (
              <Link 
                key={index}
                to={button.to} 
                style={{ 
                  padding: "12px 24px", 
                  backgroundColor: button.backgroundColor || "rgba(40, 167, 69, 0.8)", 
                  color: "white", 
                  textDecoration: "none", 
                  borderRadius: "25px",
                  backdropFilter: "blur(5px)"
                }}
              >
                {button.text}
              </Link>
            ))}
            
            {showAdminPanelButton && currentUser?.role === 'Admin' && (
              <Link to="/admin" style={{ 
                padding: "12px 24px", 
                backgroundColor: "rgba(255, 140, 0, 0.8)", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "25px",
                backdropFilter: "blur(5px)"
              }}>
                🛠️ Painel Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}