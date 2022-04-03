import os

# === Constants ===
PACKAGES_ROOT = os.path.abspath('..')
PY_ROOT = os.path.abspath('.')
PY_SRC = os.path.abspath('./src/')

# === Configurations ===
entrance = os.path.join(PY_SRC, '__main__.py')
package_name = 'backend'
distpath = os.path.join(PY_ROOT, 'dist')
hook_dir = os.path.join(PY_SRC, 'hooks')
# Additional non-binary files to be added to the executable. ["SRC;DEST", ...]
data = []
# Additional binary files to be added to the executable. ["SRC;DEST", ...]
binaries = [] 

def fix_codec_error(func):
    """Decorator. Changes the active console code page to 
    United States (English).
    """
    def wrapper(*args, **kwargs):
        import os
        os.system("chcp 437")
        return func(*args, **kwargs)
    return wrapper

@ fix_codec_error
def build():
    import PyInstaller.__main__

    # === RUN INSTALLER ===
    scripts = []
    scripts.append("--clean")  # remove temporary files, or some change might not be executed
    scripts.append("--noconfirm") # replace output directory without confirm
    if package_name:
        scripts.append('--name={name}'.format(name=package_name)),
    if distpath:
        scripts.append('--distpath={distpath}'.format(distpath=distpath)),
    if hook_dir:
        scripts.append('--additional-hooks-dir={hook_dir}'.format(hook_dir=hook_dir))
    if data:
        for _data in data:
            scripts.append('--add-data={data}'.format(data=_data))
    if binaries:
        for binary in binaries:
            scripts.append('--add-binary={binary}'.format(binary=binary))
    scripts.append(entrance)

    PyInstaller.__main__.run(scripts)