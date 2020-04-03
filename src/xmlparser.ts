/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */

// I HATE HARD CODING BUT I DON'T HAVE WAY TO MAKE THIS FILE WITHOUT HARD CODING
export async function generate_xml_string(ipaurl:string, bundleid:string, name:string) {
  const imageurl:string = 'https://github.com/cokia.png';
  const xml_part_1:string = '<?xml version="1.0" encoding="UTF-8"?><plist version="1.0"><dict><key>items</key><array><dict><key>assets</key><array><dict><key>kind</key><string>software-package</string><key>url</key><string>';
  const xml_part_2:string = '</string></dict><dict> <key>kind</key> <string>display-image</string> <key>needs-shine</key> <false/> <key>url</key> <string>';
  const xml_part_3:string = '</string> </dict> <dict> <key>kind</key> <string>full-size-image</string> <key>needs-shine</key> <false/> <key>url</key> <string>';
  const xml_part_4:string = '</string> </dict></array><key>metadata</key><dict><key>bundle-identifier</key><string>';
  const xml_part_5:string = '</string><key>bundle-version</key><string>1.0</string><key>kind</key><string>software</string><key>subtitle</key> <string>';
  const xml_part_6:string = '</string><key>title</key><string>';
  const xml_part_7:string = '</string></dict></dict></array></dict></plist>';
  const xmlfinal:string = xml_part_1 + ipaurl + xml_part_2 + imageurl + xml_part_3 + imageurl + xml_part_4 + bundleid + xml_part_5 + name + xml_part_6 + name + xml_part_7;
  return xmlfinal;
}
