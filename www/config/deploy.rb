$:.unshift(File.expand_path('./lib', ENV['rvm_path']))
require "rvm/capistrano"

set :using_rvm, true
set :rvm_type, :user
set :rvm_ruby_string, '1.9.2'
set :user, "rails"
set :application, "places_mobile"
set :domain, "m.grubm.com"
set :deploy_to, "/home/#{user}/#{domain}"
set :keep_releases, 5

default_run_options[:pty] = true  # Must be set for the password prompt from git to work
set :repository, "git@github.com:dellerbie/places_mobile.git"
set :scm, "git"
set :scm_verbose, true
set :use_sudo, false
set :branch, "master"
set :deploy_via, :remote_cache

role :web, "dellerbie.com"
role :app, "dellerbie.com"
role :db,  "dellerbie.com", :primary => true

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart do ; end
end

task :package_assets do
  run "cd #{deploy_to}/current && jammit"
end

task :copy_index_html do 
  run "cp #{deploy_to}/current/touch/resources/css/sencha-touch.css #{deploy_to}/current/public/assets"
  run "cd #{deploy_to}/current && cp index.html public"
end

before "deploy:restart", "package_assets", "copy_index_html"