source 'https://rubygems.org'
group :jekyll_plugins do
    gem 'uri', '0.10.1'
    gem 'jekyll'
    gem 'jekyll-archives'
    gem 'jekyll-diagrams'
    gem 'jekyll-email-protect'
    gem 'jekyll-feed'
    gem 'jekyll-github-metadata'
    gem 'jekyll-imagemagick'
    gem 'jekyll-paginate-v2'
    gem 'jekyll-scholar'
    gem 'jekyll-sitemap'
    gem 'jekyll-target-blank'
    gem 'jekyll-twitter-plugin'
    gem 'jemoji'
    gem 'unicode_utils'
    gem 'webrick'
    gem 'htmlcompressor'
    gem 'htmlbeautifier'
end
group :other_plugins do
    gem 'httparty'
    gem 'feedjira'
    gem 'faraday-retry' # silences Faraday v2 retry-middleware warning
end

# Formerly-default stdlib gems that Ruby 3.4+/4.0 no longer bundle. The
# jekyll-scholar -> citeproc/bibtex chain still requires several of them,
# so declare them explicitly to avoid LoadError on modern Ruby.
group :stdlib_compat do
    gem 'observer'
    gem 'csv'
    gem 'base64'
    gem 'bigdecimal'
    gem 'logger'
    gem 'ostruct'
    gem 'fiddle'
end
