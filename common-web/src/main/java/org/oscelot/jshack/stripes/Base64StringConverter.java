/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.oscelot.jshack.stripes;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sourceforge.stripes.util.Base64;
import net.sourceforge.stripes.validation.TypeConverter;
import net.sourceforge.stripes.validation.ValidationError;

/**
 *
 * @author Wiley Fuller <wfuller@swin.edu.au>
 */
public class Base64StringConverter implements TypeConverter<String> {

    public void setLocale(Locale locale) {
    }

    public String convert(String input, Class<? extends String> targetType, Collection<ValidationError> clctn) {
        byte[] decodedBytes = Base64.decode(input);
        try {
            return new String(decodedBytes, "UTF-8");
        } catch (UnsupportedEncodingException ex) {
            throw new RuntimeException("Couldn't decode base64 string: " + input, ex);
        }
    }
}
