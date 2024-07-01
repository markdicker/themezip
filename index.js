const gl = require( "glob" );
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createArchive( archiveName = "release.zip", basePath = "./" )
{
    console.log( basePath );
    
    console.log( path.join( basePath, ".distignore") );

    fs.readFile( path.join( basePath, ".distignore"), "UTF8", ( err, content ) => {
        if ( err ) 
        {
            ignoreFiles = [];            

            const files = gl.globSync( path.join( basePath, "**/*" ), { ignore: ignoreFiles } );

            if ( files.length > 0 )
            {
                const output = fs.createWriteStream( archiveName );
    
                const archive = archiver('zip', {
                    zlib: { level: 9 } // Sets the compression level.
                });   
    
                // pipe archive data to the file
                archive.pipe(output);
    
                files.forEach( f => {
                    let name = path.join( "wpzipname", f.replace( path.join( basePath, "" ), "" ));
    
                    archive.file( f , { name: name });
                })
    
                archive.finalize();

            }
        }
        else
        {
            ignoreBaseFiles = content.split("\n");

            ignoreFiles = ignoreBaseFiles.map( f => {
                
                if ( f[0] != '#' )
                {
                    if ( f[ f.length-1] == '*' )
                        return path.join( basePath, f );
                    else
                    {
                        try {
                            stat = fs.statSync( path.join( basePath, f ) );

                            // console.log( stat );

                            if ( stat && stat.isFile() )
                            {
                                return path.join( basePath, f );
                            }
                            else if ( stat && stat.isDirectory() )
                            {
                                return path.join( path.join( basePath, f ), "**" );
                            }
                        }
                        catch( e )
                        {
                            // ignore any file that gives a stat error
                            return path.join( basePath, f );
                        }
                    }

                }
            }).filter( f => { return ( f !== undefined ? true : false ); });

            const files = gl.globSync( path.join( basePath, "**/*" ), { ignore: ignoreFiles } );

            if ( files.length > 0 )
            {
                const output = fs.createWriteStream( archiveName );
    
                const archive = archiver('zip', {
                    zlib: { level: 9 } // Sets the compression level.
                });   
    
                // pipe archive data to the file
                archive.pipe(output);
    
                files.forEach( f => {
                    let name = path.join( "wpzipname", f.replace( path.join( basePath, "" ), "" ));
    
                    archive.file( f , { name: name });
                })
    
                archive.finalize();

            }
        }

        console.table( ignoreFiles );
    });

}

exports.wpZip = createArchive;
