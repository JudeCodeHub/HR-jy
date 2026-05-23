import urllib.request
import json
import os
import subprocess
import sys

# Get package urls from PyPI JSON API
def get_pypi_url(package_name, version, filename_keyword):
    try:
        api_url = f"https://pypi.org/pypi/{package_name}/{version}/json"
        req = urllib.request.urlopen(api_url)
        data = json.loads(req.read().decode('utf-8'))
        for release in data['urls']:
            if filename_keyword in release['filename']:
                return release['url']
    except Exception as e:
        print(f"Error fetching metadata for {package_name}: {e}")
    return None

def download_file(url, output_path):
    print(f"Downloading {url} to {output_path}...")
    
    # Simple downloader with progress
    def progress_report(block_num, block_size, total_size):
        read_so_far = block_num * block_size
        if total_size > 0:
            percent = min(100.0, read_so_far * 100.0 / total_size)
            s = f"\rDownloaded: {read_so_far / (1024*1024):.2f}MB / {total_size / (1024*1024):.2f}MB ({percent:.1f}%)"
            sys.stdout.write(s)
            sys.stdout.flush()
        else:
            sys.stdout.write(f"\rDownloaded: {read_so_far / (1024*1024):.2f}MB")
            sys.stdout.flush()
            
    urllib.request.urlretrieve(url, output_path, reporthook=progress_report)
    print("\nDownload complete!")

def install_local():
    # Make sure we use the correct pip executable inside the venv
    venv_dir = os.path.dirname(os.path.abspath(__file__))
    pip_exe = os.path.join(venv_dir, "venv", "Scripts", "pip.exe")
    if not os.path.exists(pip_exe):
        pip_exe = "pip"
    
    print(f"Using pip path: {pip_exe}")
    
    # 1. Download and Install TensorFlow
    tf_url = get_pypi_url("tensorflow", "2.21.0", "cp312-cp312-win_amd64.whl")
    if tf_url:
        tf_dest = os.path.join(venv_dir, "tensorflow-2.21.0-cp312-cp312-win_amd64.whl")
        if not os.path.exists(tf_dest):
            download_file(tf_url, tf_dest)
        print("Installing TensorFlow locally...")
        subprocess.check_call([pip_exe, "install", tf_dest])
        # Clean up the file to save disk space
        try:
            os.remove(tf_dest)
            print("Cleaned up TensorFlow installer wheel.")
        except Exception as e:
            print(f"Could not remove temporary file: {e}")
    else:
        print("Tensorflow package URL not found on PyPI JSON API.")

    # 2. Download and Install Face Recognition Models
    frm_url = get_pypi_url("face-recognition-models", "0.3.0", "face_recognition_models-0.3.0.tar.gz")
    if frm_url:
        frm_dest = os.path.join(venv_dir, "face_recognition_models-0.3.0.tar.gz")
        if not os.path.exists(frm_dest):
            download_file(frm_url, frm_dest)
        print("Installing Face Recognition Models locally...")
        subprocess.check_call([pip_exe, "install", frm_dest])
        # Clean up the file to save disk space
        try:
            os.remove(frm_dest)
            print("Cleaned up Face Recognition Models installer archive.")
        except Exception as e:
            print(f"Could not remove temporary file: {e}")
    else:
        print("Face Recognition Models URL not found on PyPI JSON API.")

    # 3. Install the rest of the requirements from requirements.txt
    print("Installing rest of the requirements from requirements.txt...")
    req_file = os.path.join(venv_dir, "requirements.txt")
    subprocess.check_call([pip_exe, "install", "-r", req_file])
    
    print("\nAll done!")

if __name__ == "__main__":
    install_local()
