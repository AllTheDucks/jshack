/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack;

import com.thoughtworks.xstream.XStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
//import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.oscelot.jshack.exceptions.HackNotFoundException;
import org.oscelot.jshack.exceptions.PackageManagementException;
import org.oscelot.jshack.model.Hack;

/**
 *
 * @author Shane Argo <sargo@usc.edu.au>
 */
public class HackPackager {
    
    public static final int BUFFER_SIZE = 2048;
    public static final int TEMP_DIR_ATTEMPTS = 1000;
    
    // Unzip code adapted from http://www.mkyong.com/java/how-to-decompress-files-from-a-zip-file/
    public static void unpackageHack(InputStream fileInputStream, boolean overwritePackage) throws IOException, PackageManagementException {
        
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        File hacksRoot = manager.getHacksRoot();
        File workingDir = manager.getWorkingDirectory();
        
        byte[] buffer = new byte[BUFFER_SIZE];
        
        File tempDir = createTempDir(workingDir);
        ZipInputStream zis = new ZipInputStream(fileInputStream);
        
        ZipEntry ze = zis.getNextEntry();
        while(ze != null){
            
            String fileName = ze.getName();
            File newFile = new File(tempDir.getPath() + File.separator + fileName);
            
            //create all non existent folders
            //else you will hit FileNotFoundException for compressed folder
            new File(newFile.getParent()).mkdirs();
            
            FileOutputStream fos = new FileOutputStream(newFile);             

            int len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }

            fos.close();   
            ze = zis.getNextEntry();
    	}
        
        zis.closeEntry();
    	zis.close();
        
        XStream xstream = manager.getHackPackageXstream();
        Hack hackPackage = (Hack)xstream.fromXML(new File(tempDir, JSHackManager.HACKPACKAGE_FILENAME));
        
        File finalDir = new File(hacksRoot, hackPackage.getIdentifier());
        if(finalDir.exists()) {
            if(overwritePackage) {
                manager.deleteHackPackage(hackPackage.getIdentifier());
            } else {
                org.apache.commons.io.FileUtils.deleteDirectory(tempDir);
                throw new PackageManagementException("Package already exists.");
            }
        }
        
        tempDir.renameTo(finalDir);
        
        manager.flagToReload();
    }
    
    public static void packageHack(String hackPackageIdentifier, OutputStream outputStream) throws HackNotFoundException, IOException {
        JSHackManager manager = JSHackManagerFactory.getHackManager();
        byte[] buffer = new byte[BUFFER_SIZE];
        
        File packageRoot = new File(manager.getHacksRoot() + File.separator + hackPackageIdentifier);
        if(!packageRoot.exists() || !packageRoot.isDirectory()) {
            throw new HackNotFoundException();
        }
        
        Iterator files = FileUtils.iterateFiles(packageRoot, TrueFileFilter.TRUE, TrueFileFilter.TRUE);
        
        ZipOutputStream zos = new ZipOutputStream(outputStream);
        int packageRootRootLength = packageRoot.getPath().length() + 1;
        while(files.hasNext()) {
            File file = (File)files.next();
            String relativePath = file.getPath().substring(packageRootRootLength);
            
            ZipEntry ze = new ZipEntry(relativePath.replace("\\", "/"));
            zos.putNextEntry(ze);
            
            FileInputStream is = new FileInputStream(file);
            
            int len;
            while ((len = is.read(buffer)) > 0) {
                zos.write(buffer, 0, len);
            }
            
            is.close();            
            zos.closeEntry();
        }
        zos.close();
    }
    
    // Taken from http://stackoverflow.com/questions/617414/create-a-temporary-directory-in-java;
    private static File createTempDir(File root) {
        File baseDir = root;
        String baseName = System.currentTimeMillis() + "-";

        for (int counter = 0; counter < TEMP_DIR_ATTEMPTS; counter++) {
          File tempDir = new File(baseDir, baseName + counter);
          if (tempDir.mkdir()) {
            return tempDir;
          }
        }
        throw new IllegalStateException("Failed to create directory within "
            + TEMP_DIR_ATTEMPTS + " attempts (tried "
            + baseName + "0 to " + baseName + (TEMP_DIR_ATTEMPTS - 1) + ')');
    }
    
}
