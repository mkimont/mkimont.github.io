#!/bin/bash
#Notes: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll
google-chrome http://127.0.0.1:4000
bundle exec jekyll serve

# Dependencies
# apt install ruby ruby-dev ruby-bundler
# bunde install permission, do:
#echo 'export GEM_HOME="$HOME/.gem"' >> ~/.bashrc
#echo 'export GEM_PATH="$HOME/.gem"' >> ~/.bashrc
#echo 'export PATH="$HOME/.gem/bin:$PATH"' >> ~/.bashrc
#source ~/.bashrc