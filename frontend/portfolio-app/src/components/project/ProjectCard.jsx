import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <div className="card group">
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.language?.slice(0, 3).map((lang) => (
            <span key={lang} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              {lang}
            </span>
          ))}
          {project.framework?.slice(0, 2).map((fw) => (
            <span key={fw} className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
              {fw}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-gray-800 transition-colors text-sm"
            >
              <FiGithub /> Code
            </a>
          )}
          <Link
            to={`/project/${project._id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors text-sm"
          >
            <FiExternalLink /> Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;