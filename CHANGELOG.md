# Change Log

All notable changes to the "redim" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]




## [2.0.1] - 2025-03-02

### Added

- Added Input boxes and Picker items to better experience at input values for optimizing the file.
- Option to automatically optimize all the image files in the current workspace. 
- Added option to keep original file or remove it once the optimized file is downloaded.
- Convert file support to .avif 

### Changed

- Image processng engine from Cloudinary sdk to libvips engine.

### Removed

- Cloudinary SDK
- Removed support to '.ico','.tif','.gif'