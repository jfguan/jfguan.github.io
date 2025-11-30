import './SharedStyles.css';
import './Homepage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Homepage() {
  const projects = [
    {
      id: 'ratemyboba',
      title: 'rate my boba',
      description: 'elo rating system for boba shops',
      link: '/ratemyboba',
    },
    {
      id: 'resolutions',
      title: 'resolutions',
      description: 'minimalist habit tracker',
      link: '/resolutions',
    },
    {
      id: '24game',
      title: '24 game',
      description: 'math puzzle game',
      link: '/24game',
    },
  ];

  return (
    <motion.div
      className="homepage-app shared-app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="homepage-container">
        <header className="homepage-header">
          <motion.h1
            className="homepage-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            jfguan
          </motion.h1>
          <motion.p
            className="homepage-subtitle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            personal projects
          </motion.p>
        </header>

        <div className="project-list">
          {projects.map((project, index) => (
            <Link
              to={project.link}
              key={project.id}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                className="project-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  x: 10,
                  backgroundColor: 'rgba(25, 27, 21, 0.05)',
                }}
              >
                <div className="project-title">{project.title}</div>
                <div className="project-description">{project.description}</div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.footer
          className="homepage-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>software engineer based in nyc</p>
        </motion.footer>
      </div>
    </motion.div>
  );
}

export default Homepage;
